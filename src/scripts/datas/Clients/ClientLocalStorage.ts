
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
            console.log(obj);
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
         * Авторизация.
         * @param userName 
         * @param userPass 
         * @param callBack 
         */
        authentication(userName: string, userPass: string, callBack: BClient.IClientResponse<Authentication.AuthenticationData>): void {
            let self = this;
            let userJson = this._getDataJson("user");
            if (userJson == null) {
                // сразу создаем
                self.getFromJsonModel(Mock.getUserJson(), Authentication.AuthenticationData, function(s,m,d){
                    let user = d;
                    user.setName(user.getName() + " " + (new Date).getSeconds().toString());
                    // записываем
                    self._setData("user", user);
                    // отвечаем
                    callBack(s, m, user);
                });
            }
            else {
                // отвечаем
                self.getFromJsonModel(self._getDataResponse("user"), Authentication.AuthenticationData, callBack);
            }
        }


        /**
         * Счета.
         */
        getAccounts(callBack: BClient.IClientResponse<Accounts.AccountEntity[]>): void {
            let self = this;

            if (Life.getUser().isNewUser()) {
                self.getFromJsonModels(Mock.getAccountsJson(), Accounts.AccountEntity, function(c,m,d){
                    let accounts = d;
                    // сразу сохраняем
                    accounts.forEach(a => {
                        self.editAccount(a, function(ss,mm,v){ 
                            // обрабатываем ошибку при добавлении
                            if (v.hasError()) {
                                callBack(ss, mm, null);
                                return;
                            }
                        });
                    });
                    callBack(c, m, accounts);
                });
            }
            else {
                self.getFromJsonModels(self._getDatasResponse("accounts"), Accounts.AccountEntity, callBack);
            }
        }

        /**
         * Редактирование счета.
         */
        editAccount(account: Accounts.AccountEntity, callBack: BClient.IClientResponse<Accounts.AccountFormValidation>): void {
            let self = this;
            // достаем все
            let data = <Accounts.AccountEntity[]>(JSON.parse(self._getDatasResponse("accounts")));
            // добавляем
            if (account.id == null || account.id === "") {
                account.id = FluxUtils.guidGenerator();
                data.push(account);
            }
            // редактируем
            else {
                if (data == null || data.length == 0) { // видимо, пытаемся добавить начальные данные (при первом запуске)
                    data = [];
                    data.push(account);
                }
                else {
                    for (let existAccount of data) {
                        if (existAccount.id == account.id) { 
                            existAccount = account; 
                            break;
                        }
                    }
                }
            }
            // сохраняем
            self._setDatas("accounts", data);
            // оповещаем
            let validation = new Accounts.AccountFormValidation(false);
            callBack(true, "", validation);
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
        editTransaction(transaction: Transactions.TransactionEntity, callBack: BClient.IClientResponse<Transactions.TransactionFormValidation>): void {
            let self = this;
            // достаем все
            let data = <Transactions.TransactionEntity[]>(JSON.parse(self._getDatasResponse("transactions")));
            // добавляем
            if (transaction.id == null || transaction.id === "") {
                transaction.id = FluxUtils.guidGenerator();
                data.push(transaction);
            }
            // редактируем
            else {
                for (let exists of data) {
                    if (exists.id == transaction.id) { 
                        exists = transaction; 
                        break;
                    }
                }
            }
            // сохраняем
            self._setDatas("transactions", data);
            // оповещаем
            let validation = new Transactions.TransactionFormValidation(false);
            callBack(true, "", validation);
        }



    }


}

//export default new Client.ClientLocalStorage;
export default Client.ClientLocalStorage;