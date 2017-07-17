
import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';

import Mock from './MockData';

import Ajax from './../plugins/Ajax';


namespace Client {

    export interface IClientResponse<T> { (succes:boolean, msg: string, val: T): void }


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
        getAccounts(callBack: IClientResponse<Accounts.AccountLine[]>) {
            let isSuccess = true;
            let errorMsg = "";

            callBack(isSuccess, errorMsg, Mock.getAccounts());
            //
            /*Ajax.get("http://zedk.ru/sites/budget/fakes/accounts.json", {}, (data) => {
                // TODO:
                callBack(isSuccess, errorMsg, Mock.getAccounts());
            });*/

            /*jQuery.ajax({
                type: 'GET',
                url: "http://zedk.ru/sites/budget/fakes/accounts.json",
                dataType: 'json',
                success: function(data) { 
                    callBack(isSuccess, errorMsg, Mock.getAccounts());
                },
                async: true
            });*/

            
        }

        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters, callBack: IClientResponse<Transactions.TransactionLine[]>) : void {
            let isSuccess = true;
            let errorMsg = "";

            let data = Mock.getTransactions();
            // TODO: filters
            //return data;

            callBack(isSuccess, errorMsg, data);
        }

    }


}

export default new Client.ClientAccessor;