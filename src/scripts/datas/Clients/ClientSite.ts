
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
        getAccounts(callBack: BClient.IClientResponse<Accounts.AccountLine[]>): void {
            let self = this;

            self.getModels("public/fakes/accounts.json", {}, Accounts.AccountLine, callBack);
        }


        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters, callBack: BClient.IClientResponse<Transactions.TransactionLine[]>) : void {
            let self = this;

            self.getModels("public/fakes/transactions.json", filters, Transactions.TransactionLine, callBack);
        }

    }


}

//export default new Client.ClientSite;
export default Client.ClientSite;