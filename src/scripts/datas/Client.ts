
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

            /*setTimeout(function(){
                callBack(isSuccess, errorMsg, Mock.getAccounts());
            }, 2000);*/
            
            //
            /*Ajax.get("/public/fakes/accounts.json", {}, (data) => {
                callBack(isSuccess, errorMsg, <Accounts.AccountLine[]>JSON.parse(data));
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