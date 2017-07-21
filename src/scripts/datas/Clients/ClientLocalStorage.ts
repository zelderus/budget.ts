
import BClient from './../BaseClient';
import Mock from './../MockData';
import {IClient} from './../ClientManager';

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

        /**
         * Счета.
         */
        getAccounts(callBack: BClient.IClientResponse<Accounts.AccountLine[]>): void {
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

//export default new Client.ClientLocalStorage;
export default Client.ClientLocalStorage;