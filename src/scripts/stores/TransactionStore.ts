

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';

import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';

import Client from './../datas/Client';


/**
 * Хранилище с транзакциями
 */
export class TransactionStore extends BaseStore {

    __accounts: Accounts.AccountLine[] = [];
    __transactions: Transactions.TransactionLine[] = [];
    __transactionFilter: Transactions.TransactionFilters;

    constructor() {
        super();

        this.__transactionFilter = new Transactions.TransactionFilters();
    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    public getAccounts(): Accounts.AccountLine[] { return this.__accounts; }
    public getTransactions(): Transactions.TransactionLine[] { return this.__transactions; }



    //
    //
    //

    private _loadInitDataAsync() {
        this._loadAccountsAsync(false);
        this._loadTransctions();
        // оповещаем
        this.emitChange();
    }

    private _loadAccountsAsync(withEmit: boolean) {
        console.log("_loadAccounts");
        //this.__accounts = Client.getAccounts();
        Client.getAccounts(acs => { 
            this.__accounts = acs;
            // do next
            if (withEmit) this.emitChange();
        });
    }

    private _loadTransctions() {
        console.log("_loadTransctions");
        this.__transactions = Client.getTransactions(this.__transactionFilter);
    }





    /**
     * Обрабатываем сообщения от диспетчера.
     * Обновляем модели данных, обращаемся к серверу.
     * @param type 
     * @param obj 
     */
    onDispatch(type: number, obj: any):boolean {
        switch(type) {

            case ActionTypes.LOAD_INIT_DATA:
                this._loadInitDataAsync();
                return true;

            case ActionTypes.ACCOUNTS_LOAD: // TODO: научить ждать асинхронку (возможно Диспетчера)
                this._loadAccountsAsync(true);
                return true;
                //break;

            case ActionTypes.TRANSACTIONS_LOAD: // TODO: научить ждать асинхронку (возможно Диспетчера)
                this._loadTransctions();
                break;

            // TODO: update transaction filters



            default:
                return true;
        }
        this.emitChange();
        return true;
    }
    
}

export default new TransactionStore;