
import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';

import Mock from './MockData';

import Ajax from './../plugins/Ajax';


namespace Client {

    export interface IClientResponse<T> { (success:boolean, msg: string, val: T): void }
    //export interface IClientServerResponse<T> { success:boolean, message: string, data: T } // формат каждого ответа с сервера

    /**
     * Запрос к данным.
     */
    export class ClientAccessor {

        constructor() {

        }


        _parseModel<T extends IClientObjectResponse>(j: any, c: new()=>T): T {
            let model = new c();
            model.fromJson(j);
            return model;
        }
        _parseModels<T extends IClientObjectResponse>(data: any, c: new()=>T): T[] {
            let lines = <any[]>data || [];
            let models = new Array<T>();
            lines.forEach((d) => {
                let model = new c();
                model.fromJson(d);
                models.push(model);
            });
            return models;
        }
        _parseToModel<T extends IClientObjectResponse>(json: string, c: new()=>T) : IClientServerParsedModelResponse<T> {
            let dataModel = <IClientServerResponse>JSON.parse(json);
            let models = this._parseModel(dataModel.data, c);
            return { success: dataModel.success, message: dataModel.message, data: models };
        }
        _parseToModels<T extends IClientObjectResponse>(json: string, c: new()=>T) : IClientServerParsedModelsResponse<T> {
            let dataModel = <IClientServerResponse>JSON.parse(json);
            let models = this._parseModels(dataModel.data, c);
            return { success: dataModel.success, message: dataModel.message, data: models };
        }



        /**
         * Счета.
         */
        getAccounts(callBack: IClientResponse<Accounts.AccountLine[]>) {
            let self = this;

            let resp = self._parseToModels(Mock.getAccountsJson(), Accounts.AccountLine);
            callBack(resp.success, resp.message, resp.data);

            /*setTimeout(function(){
                let resp = self._parseToModels(Mock.getAccountsJson(), Accounts.AccountLine);
                callBack(resp.success, resp.message, resp.data);
            }, 5000);*/

            /*setTimeout(function(){
                let resp = self._parseToModels(Mock.getAccountsJson(), Accounts.AccountLine);
                callBack(false, "ошибочка вышла", resp.data);
            }, 2000);*/
            
            
            /*Ajax.get(
                "public/fakes/accounts.json", 
                {}, 
                (data) => {
                    let resp = self._parseToModels(data, Accounts.AccountLine);
                    callBack(resp.success, resp.message, resp.data);
                },
                (errorMsg) => {
                    callBack(false, errorMsg, null);
                }
            );*/
        }
        

        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters, callBack: IClientResponse<Transactions.TransactionLine[]>) : void {
            let self = this;

            let resp = self._parseToModels(Mock.getTransactionsJson(), Transactions.TransactionLine);
            callBack(resp.success, resp.message, resp.data);

            /*
            Ajax.get(
                "public/fakes/transactions.json", 
                filters, 
                (data) => {
                    let resp = self._parseToModels(Mock.getTransactionsJson(), Transactions.TransactionLine);
                    callBack(resp.success, resp.message, resp.data);
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