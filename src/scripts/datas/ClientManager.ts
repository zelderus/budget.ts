import BClient from './BaseClient';
import FluxUtils from './../flux/Utils';
import Actions from './../actions/Actions';
import Life from './../Life';

import ClientLocalStorage from './Clients/ClientLocalStorage';
import ClientSite from './Clients/ClientSite';

import Authentication from './../models/Authentication';
import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';


/**
 * Интерфейс клиента.
 */
export interface IClient {
    registration(userName: string, userPass: string, callBack: BClient.IClientResponse<Authentication.AuthenticationData>): void;
    authentication(userName: string, userPass: string, callBack: BClient.IClientResponse<Authentication.AuthenticationData>): void;
    getAccounts(callBack: BClient.IClientResponse<Accounts.AccountEntity[]>): void;
    editAccount(account: Accounts.AccountEntity, callBack: BClient.IClientResponse<Accounts.AccountFormValidation>): void;
    getTransactions(filters: Transactions.TransactionFilters, callBack: BClient.IClientResponse<Transactions.TransactionEntity[]>) : void;
    editTransaction(transaction: Transactions.TransactionEntity, withRecalculateAccounts: boolean, callBack: BClient.IClientResponse<Transactions.TransactionFormValidation>): void;
    deleteTransaction(transactionId: string, withRecalculateAccounts: boolean, callBack: BClient.IClientResponse<any>) : void;
}


/**
 * Типы клиентов.
 */
export enum ClientTypes {
    LOCAL_STORAGE   = 1,
    SITE            = 2
}





namespace Client {

    

    /**
     * Управление клиентами.
     */
    export class ClientManager {

        private __client: IClient;

        constructor() {
            this.setClient(ClientTypes.LOCAL_STORAGE);
        }

        /**
         * Установка клиента на приложение.
         */
        public setClient(clientType: ClientTypes): void {
            switch(clientType) {
                case ClientTypes.LOCAL_STORAGE:
                    this.__client = new ClientLocalStorage();
                    return;
                case ClientTypes.SITE:
                    this.__client = new ClientSite();
                    return;
            }
            let msg = "Ошибка установки клиента. Клиент с ID #'" + clientType + "' не определен.";
            FluxUtils.logError(msg);
            Actions.log(msg, true);
            Actions.errorFatal(msg);
        }


        /**
         * Текущий клиент для работы с данными.
         */
        public getClient(): IClient {
            return this.__client;
        }


    }


}

export default new Client.ClientManager;
