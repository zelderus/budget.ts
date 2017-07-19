

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';
import Actions from './../actions/Actions';

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
        Actions.loadingStart();
        // счета
        this._loadAccountsAsync((s,m) => { 
            if (!s) { this._onFatalError(m); return;}
            // транзакции
            this._loadTransactionsAsync((s,m) => { 
                if (!s) { this._onFatalError(m); return;}
                // оповещаем
                this.emitChange();
                Actions.loadingStop();
            });
        });
    }

    private _loadAccountsAsync(callBack?: (success:boolean, errorMsg: string) => void) {
        Client.getAccounts((s, m, d) => { 
            this.__accounts = d;
            if (callBack != null) callBack(s,m);
        });
    }

    private _loadTransactionsAsync(callBack?: (success:boolean, errorMsg: string) => void) {
        Client.getTransactions(this.__transactionFilter, (s, m, d) => {
            this.__transactions = d;
            if (callBack != null) callBack(s, m);
        });
    }


    //
    //
    //

    private _onError(msg: string): void {
        Actions.log("Ошибка: " + msg);
    }
    private _onFatalError(msg: string): void {
        Actions.errorFatal(msg);
        Actions.loadingStop(); // критическая ошибка выпадает при загрузках, значит тут всегда сами отключаем панель загрузки
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

            case ActionTypes.ACCOUNTS_LOAD:
                this._loadAccountsAsync((s,m) => { if (!s) { this._onError(m);} this.emitChange(); });
                return true;
                //break;

            case ActionTypes.TRANSACTIONS_LOAD:
                this._loadTransactionsAsync((s,m) => { if (!s) { this._onError(m);} this.emitChange(); });
                return true;
                //break;

            // TODO: update transaction filters



            //default:
            //    return true;
        }
        //this.emitChange();
        return true;
    }
    
}

export default new TransactionStore;