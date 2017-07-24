
import BClient from './../BaseClient';
import Mock from './../MockData';
import {IClient} from './../ClientManager';
import Life from './../../Life';

import Authentication from './../../models/Authentication';
import Accounts from './../../models/Accounts';
import Transactions from './../../models/Transactions';



namespace Client {

 


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
        private _wrapData(data: any, isSuccess: boolean = true, errMsg: string = ""): string {
            return JSON.stringify({success:isSuccess, message: errMsg, data: data});
        }
        private _getDataResponse(key: string) {
            let dataJson = JSON.parse(this._getDataJson(key));
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
        getAccounts(callBack: BClient.IClientResponse<Accounts.AccountLine[]>): void {
            let self = this;

            if (Life.getUser().isNewUser()) {
                self.getFromJsonModels(Mock.getAccountsJson(), Accounts.AccountLine, callBack);
            }
            else {
                self.getFromJsonModels(self._getDataResponse("accounts"), Accounts.AccountLine, callBack);
            }
        }


        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters, callBack: BClient.IClientResponse<Transactions.TransactionLine[]>) : void {
            let self = this;
            self.getFromJsonModels(self._getDataResponse("transactions"), Transactions.TransactionLine, function(s,m,d){
                let transactions = d;
                // TODO: filter

                // отвечаем
                callBack(s, m, transactions);
            });
        }

        

    }


}

//export default new Client.ClientLocalStorage;
export default Client.ClientLocalStorage;