
import BClient from './../BaseClient';
import Mock from './../MockData';
import {IClient} from './../ClientManager';
import Life from './../../Life';
import FluxUtils from './../../flux/Utils';

import Authentication from './../../models/Authentication';
import Accounts from './../../models/Accounts';
import Transactions from './../../models/Transactions';
import Currencies from './../../models/Currencies';
import Categories from './../../models/Categories';



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

            // валюты
            self.getFromJsonModels(Mock.getCurrenciesJson(), Currencies.CurrencyEntity, function(c1,m1,d1){
                d1.forEach(a => { self.editCurrency(a, function(ss1,mm1,v1){ if (!ss1 || v1.hasError()) { callBack(ss1, mm1, responseModel); return; }  }); });
                // категории
                self.getFromJsonModels(Mock.getCategoriesJson(), Categories.CategoryEntity, function(c2,m2,d2){
                    d2.forEach(a => { self.editCategory(a, function(ss2,mm2,v2){ if (!ss2 || v2.hasError()) { callBack(ss2, mm2, responseModel); return; }  }); });
                    // счета
                    self.getFromJsonModels(Mock.getAccountsJson(), Accounts.AccountEntity, function(c3,m3,d3){
                        d3.forEach(a => { self.editAccount(a, function(ss3,mm3,v3){ if (!ss3 || v3.hasError()) { callBack(ss3, mm3, responseModel); return; }  }); });
                        // TODO: другие данные

                        // успешный ответ
                        callBack(true, "", responseModel);
                    });

                });
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
         * Валюты.
         */
        getCurrencies(callBack: BClient.IClientResponse<Currencies.CurrencyEntity[]>): void {
            let self = this;
            self.getFromJsonModels(self._getDatasResponse("currencies"), Currencies.CurrencyEntity, callBack);
        }

        /**
         * Редактирование валюты.
         */
        editCurrency(currency: Currencies.CurrencyEntity, callBack: BClient.IClientResponse<Currencies.CurrencyFormValidation>): void {
            let self = this;
            // достаем все
            self.getFromJsonModels(self._getDatasResponse("currencies"), Currencies.CurrencyEntity, function(s,m,d){
                let data = d;
                if (data == null || data.length == 0) data = [];
                // серверная проверка валидации
                let validation = new Currencies.CurrencyFormValidation(currency);
                if (validation.hasError()){
                    callBack(s, m, validation);
                    return;
                }
                // добавляем
                if (currency.id == null || currency.id === "") {
                    currency.id = FluxUtils.guidGenerator();
                    data.push(currency);
                }
                // редактируем
                else {
                    let exists = data.filter(e => e.id == currency.id)[0];
                    if (exists != null) exists.fill(currency);
                    else data.push(currency);
                }
                // сохраняем
                self._setDatas("currencies", data);
                // оповещаем
                callBack(s, m, validation);
            });
        }









        /**
         * Категории.
         */
        getCategories(callBack: BClient.IClientResponse<Categories.CategoryEntity[]>): void {
            let self = this;
            self.getFromJsonModels(self._getDatasResponse("categories"), Categories.CategoryEntity, callBack);
        }
        /**
         * Редактирование категории.
         */
        editCategory(category: Categories.CategoryEntity, callBack: BClient.IClientResponse<Categories.CategoryFormValidation>): void {
            let self = this;
            // достаем все
            self.getFromJsonModels(self._getDatasResponse("categories"), Categories.CategoryEntity, function(s,m,d){
                let data = d;
                if (data == null || data.length == 0) data = [];
                // серверная проверка валидации
                let validation = new Categories.CategoryFormValidation(category);
                if (validation.hasError()){
                    callBack(s, m, validation);
                    return;
                }
                // добавляем
                if (category.id == null || category.id === "") {
                    category.id = FluxUtils.guidGenerator();
                    data.push(category);
                }
                // редактируем
                else {
                    let exists = data.filter(e => e.id == category.id)[0];
                    if (exists != null) exists.fill(category);
                    else data.push(category);
                }
                // сохраняем
                self._setDatas("categories", data);
                // оповещаем
                callBack(s, m, validation);
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
                // серверная проверка валидации
                let validation = new Accounts.AccountFormValidation(account);
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
                    accountTo.sum += cost * (isDelete?-1:1); // сюда был перевод
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
        editTransaction(transaction: Transactions.TransactionEntity, withRecalculations: boolean, callBack: BClient.IClientResponse<Transactions.TransactionFormValidation>): void {
            let self = this;
            let isNewTransaction = transaction.id == null || transaction.id === "";
            // небольшие правки
            if (transaction.type != Transactions.TransactionTypes.Transfer) {
                transaction.accountToId = null;
            }
            // достаем все
            self.getFromJsonModels(self._getDatasResponse("transactions"), Transactions.TransactionEntity, function(s,m,d){
                let data = d;
                if (data == null || data.length == 0) data = [];
                // серверная проверка валидации
                let validation = new Transactions.TransactionFormValidation(transaction);
                if (validation.hasError()){
                    callBack(s, m, validation);
                    return;
                }
                // прошлая запись
                let exists = isNewTransaction ? null : data.filter(e => e.id == transaction.id)[0];
                // перерасчет счетов (суммы)
                if (withRecalculations) {
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
        deleteTransaction(transactionId: string, withRecalculations: boolean, callBack: BClient.IClientResponse<any>) : void {
            let self = this;
            // достаем все
            self.getFromJsonModels(self._getDatasResponse("transactions"), Transactions.TransactionEntity, function(s,m,d){
                let data = d;
                // перерасчет счетов (суммы)
                if (withRecalculations) {
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