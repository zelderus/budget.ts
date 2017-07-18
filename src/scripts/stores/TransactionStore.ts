

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
        this._loadAccountsAsync(() => { // счета
            this._loadTransactionsAsync(() => { // транзакции
                // оповещаем
                this.emitChange();
                Actions.loadingStop();
            });
        });
    }

    private _loadAccountsAsync(callBack?: () => void) {
        Client.getAccounts((s, m, acs) => { 
            this.__accounts = acs;
            if (callBack != null) callBack();
            if (!s) this._onLoadError(m);
        });
    }

    private _loadTransactionsAsync(callBack?: () => void) {
        Client.getTransactions(this.__transactionFilter, (s, m, trs) => {
            this.__transactions = trs;
            if (callBack != null) callBack();
            if (!s) this._onLoadError(m);
        });
    }


    //
    //
    //

    private _onLoadError(msg: string): void {
        // TODO: заблокировать приложение и отобразить ошибку??
        let errMsg = "Ошибка в Store: " + msg;
        console.log(errMsg);
        Actions.log(errMsg);
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
                this._loadAccountsAsync(() => { this.emitChange(); });
                return true;
                //break;

            case ActionTypes.TRANSACTIONS_LOAD:
                this._loadTransactionsAsync(() => { this.emitChange(); });
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