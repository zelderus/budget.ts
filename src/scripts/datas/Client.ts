
import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';

import Mock from './MockData';

import Ajax from './../plugins/Ajax';


namespace Client {

    export interface IClientResponse<T> { (success:boolean, msg: string, val: T): void }
    export interface IClientServerResponse<T> { success:boolean, message: string, data: T } // формат каждого ответа с сервера

    /**
     * Запрос к данным.
     */
    export class ClientAccessor {

        constructor() {

        }

        /**
         * Счета.
         */
        getAccounts(callBack: IClientResponse<Accounts.AccountLine[]>) {
            
            callBack(true, "", Mock.getAccounts());

            /*setTimeout(function(){
                callBack(false, "сервер не отвечает", null);
            }, 5000);*/

            /*setTimeout(function(){
                callBack(true, "", Mock.getAccounts());
            }, 2000);*/
            
            /*
            Ajax.get(
                "public/fakes/accounts.json", 
                {}, 
                (data) => {
                    let dataModel = <IClientServerResponse<Accounts.AccountLine[]>>JSON.parse(data);
                    callBack(dataModel.success, dataModel.message, dataModel.data);
                },
                (errorMsg) => {
                    callBack(false, errorMsg, null);
                }
            );
            */
        }

        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters, callBack: IClientResponse<Transactions.TransactionLine[]>) : void {

            callBack(true, "", Mock.getTransactions());

            /*
            Ajax.get(
                "public/fakes/transactions.json", 
                filters, 
                (data) => {
                    let dataModel = <IClientServerResponse<any[]>>JSON.parse(data);
                    // распарсиваем некоторые типы вручную
                    let lines = dataModel.data || [];
                    let models: Transactions.TransactionLine[] = [];
                    lines.forEach((d) => {
                        let model = new Transactions.TransactionLine();
                        model.fromJson(d);
                        models.push(model);
                    });

                    callBack(dataModel.success, dataModel.message, models);
                },
                (errorMsg) => {
                    callBack(false, errorMsg, null);
                }
            );
            */
        }

    }


}

export default new Client.ClientAccessor;