import BClient from './BaseClient';
import Mock from './MockData';

import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';



namespace Client {

 


    /**
     * Запрос к данным.
     */
    export class ClientAccessor extends BClient.BaseClient {

        constructor() {
            super();
        }

        /**
         * Счета.
         */
        getAccounts(callBack: BClient.IClientResponse<Accounts.AccountLine[]>) {
            let self = this;

            self.getFromJsonModels(Mock.getAccountsJson(), Accounts.AccountLine, callBack);

            /*setTimeout(function(){
                self.getFromJsonModels(Mock.getAccountsJson(), Accounts.AccountLine, callBack);
            }, 5000);*/
            
            //self.getModels("public/fakes/accounts.json", {}, Accounts.AccountLine, callBack);
        }


        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters, callBack: BClient.IClientResponse<Transactions.TransactionLine[]>) : void {
            let self = this;

            self.getFromJsonModels(Mock.getTransactionsJson(), Transactions.TransactionLine, callBack);

            //self.getModels("public/fakes/transactions.json", filters, Transactions.TransactionLine, callBack);
        }

    }


}

export default new Client.ClientAccessor;