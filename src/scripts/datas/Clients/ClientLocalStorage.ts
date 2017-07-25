
import BClient from './../BaseClient';
import Mock from './../MockData';
import {IClient} from './../ClientManager';
import Life from './../../Life';
import FluxUtils from './../../flux/Utils';

import Authentication from './../../models/Authentication';
import Accounts from './../../models/Accounts';
import Transactions from './../../models/Transactions';



namespace Client {

 
    interface ILocalStorageArrayInDataBase { data: any[] };


    /**
     * Клиент с локальным хранилищем в браузере.
     */
    export class ClientLocalStorage extends BClient.BaseClient implements IClient {

        constructor() {
            super();
        }


        private _getDataJson(key: string): string {
            let storageStr = localStorage.getItem(key);
            return storageStr;
        }
        private _setData(key: string, obj: IClientObjectResponse): void {
            let storageStr = JSON.stringify(obj.toJson());
            localStorage.setItem(key, storageStr);
        }
        private _setDatas(key: string, obj: IClientObjectResponse[]): void {
            let dataInLine: ILocalStorageArrayInDataBase = { data: [] };
            if (obj != null) obj.forEach(o => dataInLine.data.push(o.toJson()));
            let storageStr = JSON.stringify(dataInLine);
            localStorage.setItem(key, storageStr);
        }
        private _wrapData(data: any, isSuccess: boolean = true, errMsg: string = ""): string {
            return JSON.stringify({success:isSuccess, message: errMsg, data: data});
        }
        private _getDataResponse(key: string): string {
            let dataJson = JSON.parse(this._getDataJson(key));
            return this._wrapData(dataJson);
        }
        private _getDatasResponse(key: string): string {
            let dataArrayJson = <ILocalStorageArrayInDataBase>JSON.parse(this._getDataJson(key));
            let dataJson: any = dataArrayJson == null ? [] : dataArrayJson.data;
            return this._wrapData(dataJson);
        }




        /**
         * Начальные данные для нового пользователя.
         */
        private _initIdleData(callBack: BClient.IClientResponse<any>): void {
            let self = this;
            let responseModel: any = null;
            // счета
            self.getFromJsonModels(Mock.getAccountsJson(), Accounts.AccountEntity, function(c1,m1,d1){
                // сохраняем
                d1.forEach(a => {
                    self.editAccount(a, function(ss,mm,v){ 
                        if (!ss || v.hasError()) { callBack(ss, mm, responseModel); return; }
                    });
                });
                // TODO: другие данные


                // успешный ответ
                callBack(true, "", responseModel);
            });
        }



        /**
         * Регистрация пользователя.
         */
        registration(userName: string, userPass: string, callBack: BClient.IClientResponse<Authentication.AuthenticationData>): void {
            let self = this;
            // в локальном клиенте (в браузере), не проверяем на наличие в "базе" и прочее
            self.getFromJsonModel(Mock.getUserJson(), Authentication.AuthenticationData, function(s,m,d){
                if (!s) { callBack(s,m,d); return; }
                // создаем и сохраняем пользователя
                let user = d;
                user.setName(user.getName() + " " + (new Date).getSeconds().toString());
                self._setData("user", user);
                // генерируем начальные данные
                self._initIdleData(function(s2, m2, d2){
                    // отвечаем
                    callBack(s2, m2, user);
                });
            });
        }

        /**
         * Авторизация.
         */
        authentication(userName: string, userPass: string, callBack: BClient.IClientResponse<Authentication.AuthenticationData>): void {
            let self = this;
            self.getFromJsonModel(self._getDataResponse("user"), Authentication.AuthenticationData, function(s,m,d){
                if (d == null || d.isAuth() != true) {
                    callBack(false, "неверный логин или пароль", null); 
                    return;
                }
                callBack(s, m, d);
            });
        }


        /**
         * Счета.
         */
        getAccounts(callBack: BClient.IClientResponse<Accounts.AccountEntity[]>): void {
            let self = this;
            self.getFromJsonModels(self._getDatasResponse("accounts"), Accounts.AccountEntity, callBack);
        }

        /**
         * Редактирование счета.
         */
        editAccount(account: Accounts.AccountEntity, callBack: BClient.IClientResponse<Accounts.AccountFormValidation>): void {
            let self = this;
            // достаем все
            self.getFromJsonModels(self._getDatasResponse("accounts"), Accounts.AccountEntity, function(s,m,d){
                let data = d;
                if (data == null || data.length == 0) data = [];
                // TODO: серверная проверка валидации
                let validation = new Accounts.AccountFormValidation(false);
                if (validation.hasError()){
                    callBack(s, m, validation);
                    return;
                }
                // добавляем
                if (account.id == null || account.id === "") {
                    account.id = FluxUtils.guidGenerator();
                    data.push(account);
                }
                // редактируем
                else {
                    let exists = data.filter(e => e.id == account.id)[0];
                    if (exists != null) exists.fill(account);
                    else data.push(account);
                }
                // сохраняем
                self._setDatas("accounts", data);
                // оповещаем
                callBack(s, m, validation);
            });
        }

        // зависимое обновление счета (редактирование/удаление транзакции)
        private _updateAccountByTransactionEdit(transaction: Transactions.TransactionEntity, oldTransaction: Transactions.TransactionEntity, isDelete: boolean): void {
            if (transaction == null) return;
            let self = this;
            self.getFromJsonModels(self._getDatasResponse("accounts"), Accounts.AccountEntity, function(s,m,accounts){
                if (!s) return;
                // сумма для вычитаний
                let cost = transaction.cost;
                if (oldTransaction != null) cost = (oldTransaction.cost - transaction.cost) * -1; // было 500, стало 300, разница: -200 (надо вычесть разницу)

                // 1. account from
                let accountFrom = accounts.filter(f => f.id == transaction.accountFromId)[0];
                if (accountFrom != null) {
                    let dif = (transaction.type == Transactions.TransactionTypes.Profit ? 1 : -1); // Spend и Change это вывод средств, идут в минус
                    if (isDelete) dif *= -1; // при удалении, обратное
                    accountFrom.sum += cost * dif;
                }
                // 2. account to
                let accountTo = accounts.filter(f => f.id == transaction.accountToId)[0];
                if (accountTo != null) {
                    accountTo.sum -= cost; // сюда был перевод, значит только вычитаем
                }
                // 3. save accounts
                self._setDatas("accounts", accounts);

            });
        }


        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters, callBack: BClient.IClientResponse<Transactions.TransactionEntity[]>) : void {
            let self = this;
            self.getFromJsonModels(self._getDatasResponse("transactions"), Transactions.TransactionEntity, function(s,m,d){
                let transactions = d;
                // TODO: filter

                // отвечаем
                callBack(s, m, transactions);
            });
        }

        /**
         * Редактирование транзакции.
         */
        editTransaction(transaction: Transactions.TransactionEntity, withRecalculateAccounts: boolean, callBack: BClient.IClientResponse<Transactions.TransactionFormValidation>): void {
            let self = this;
            let isNewTransaction = transaction.id == null || transaction.id === "";
            // достаем все
            self.getFromJsonModels(self._getDatasResponse("transactions"), Transactions.TransactionEntity, function(s,m,d){
                let data = d;
                if (data == null || data.length == 0) data = [];
                // TODO: серверная проверка валидации
                let validation = new Transactions.TransactionFormValidation(false);
                if (validation.hasError()){
                    callBack(s, m, validation);
                    return;
                }
                // прошлая запись
                let exists = isNewTransaction ? null : data.filter(e => e.id == transaction.id)[0];
                // перерасчет счетов (суммы)
                if (withRecalculateAccounts) {
                    self._updateAccountByTransactionEdit(transaction, exists, false);
                }
                // добавляем
                if (isNewTransaction) {
                    transaction.id = FluxUtils.guidGenerator();
                    data.push(transaction);
                }
                // редактируем
                else {
                    //let exists = data.filter(e => e.id == transaction.id)[0];
                    if (exists != null) exists.fill(transaction);
                    else data.push(transaction);
                }
                // сохраняем
                self._setDatas("transactions", data);
                // оповещаем
                callBack(s, m, validation);
            });
        }

        /**
         * Удаление транзакции.
         */
        deleteTransaction(transactionId: string, withRecalculateAccounts: boolean, callBack: BClient.IClientResponse<any>) : void {
            let self = this;
            // достаем все
            self.getFromJsonModels(self._getDatasResponse("transactions"), Transactions.TransactionEntity, function(s,m,d){
                let data = d;
                // перерасчет счетов (суммы)
                if (withRecalculateAccounts) {
                    let transaction = data.filter(t => t.id == transactionId)[0];
                    self._updateAccountByTransactionEdit(transaction, null, true);
                }
                // удаляем
                data = data.filter(t => t.id != transactionId);
                self._setDatas("transactions", data);
                // оповещаем
                callBack(s, m, null);
            });
        }



    }


}

//export default new Client.ClientLocalStorage;
export default Client.ClientLocalStorage;