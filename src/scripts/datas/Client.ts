
import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';

import Mock from './MockData';


namespace Client {

    export interface ICbfGetAccounts { (accounts: Accounts.AccountLine[]): void }

    /**
     * Запрос к данным.
     */
    export class ClientAccessor {

        constructor() {

        }

        /**
         * Счета.
         */
        
        /*getAccounts(callBack: ICbfGetAccounts): Accounts.AccountLine[] {       
            return Mock.getAccounts();
        }*/
        getAccounts(callBack: ICbfGetAccounts) {
            callBack(Mock.getAccounts());
        }

        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters) : Transactions.TransactionLine[] {
            let data = Mock.getTransactions();
            // TODO: filters
            return data;
        }

    }


}

export default new Client.ClientAccessor;