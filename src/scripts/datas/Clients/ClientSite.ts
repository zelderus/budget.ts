
import BClient from './../BaseClient';
import Mock from './../MockData';
import {IClient} from './../ClientManager';

import Authentication from './../../models/Authentication';
import Accounts from './../../models/Accounts';
import Transactions from './../../models/Transactions';



namespace Client {

 





    /**
     * Клиент для обращейни к сайту.
     */
    export class ClientSite extends BClient.BaseClient implements IClient {

        constructor() {
            super();
        }


        /**
         * Авторизация.
         * @param userName 
         * @param userPass 
         * @param callBack 
         */
        authentication(userName: string, userPass: string, callBack: BClient.IClientResponse<Authentication.AuthenticationData>): void {
            this.getFromJsonModel(Mock.getUserJson(), Authentication.AuthenticationData, callBack);
        }

        
        /**
         * Счета.
         */
        getAccounts(callBack: BClient.IClientResponse<Accounts.AccountEntity[]>): void {
            let self = this;

            self.getModels("public/fakes/accounts.json", {}, Accounts.AccountEntity, callBack);
        }

        /**
         * Редактирование счета.
         */
        editAccount(account: Accounts.AccountEntity, callBack: BClient.IClientResponse<Accounts.AccountFormValidation>): void {
            let self = this;
            // TODO:

            // оповещаем
            let validation = new Accounts.AccountFormValidation(false);
            callBack(false, "редактирование счета не реализованно в этом клиенте", validation);
        }


        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters, callBack: BClient.IClientResponse<Transactions.TransactionEntity[]>) : void {
            let self = this;

            self.getModels("public/fakes/transactions.json", filters, Transactions.TransactionEntity, callBack);
        }

        /**
         * Редактирование транзакции.
         */
        editTransaction(transaction: Transactions.TransactionEntity, callBack: BClient.IClientResponse<Transactions.TransactionFormValidation>): void {
            let self = this;
            // TODO:

            // оповещаем
            let validation = new Transactions.TransactionFormValidation(false);
            callBack(false, "редактирование транзакции не реализованно в этом клиенте", validation);
        }


        

    }


}

//export default new Client.ClientSite;
export default Client.ClientSite;