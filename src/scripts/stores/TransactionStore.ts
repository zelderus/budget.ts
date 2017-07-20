

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

    __isEditTransactionWndShow: boolean;
    __currentEditTransactionId: string;


    constructor() {
        super();

        this.__isEditTransactionWndShow = false;
        this.__currentEditTransactionId = "";
        this.__transactionFilter = new Transactions.TransactionFilters();

    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    public getAccounts(): Accounts.AccountLine[] { return this.__accounts; }
    public getTransactions(): Transactions.TransactionLine[] { return this.__transactions; }
    public getTransactionById(id: string): Transactions.TransactionLine { if (id === undefined || id == null || id === "") return null; return this.__transactions.filter(f => f.id == id)[0]; }
    public isShowEditTransactionPanel(): boolean { return this.__isEditTransactionWndShow; }
    public getCurrentEditTransactionId(): string { return this.__currentEditTransactionId; }



    //
    // Datas
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

    private _loadAccountsAsync(callBack: (success:boolean, errorMsg: string) => void) {
        Client.getAccounts((s, m, d) => { 
            this.__accounts = d;
            callBack(s,m);
        });
    }

    private _loadTransactionsAsync(callBack: (success:boolean, errorMsg: string) => void) {
        Client.getTransactions(this.__transactionFilter, (s, m, d) => {
            this.__transactions = d;
            callBack(s, m);
        });
    }


    //
    // Errors
    //

    private _onError(msg: string): void {
        Actions.log("Ошибка: " + msg);
    }
    private _onFatalError(msg: string): void {
        Actions.errorFatal(msg);
    }




    //
    //  UI
    //


    /**
     * Сменилась навигация, очищаем вспомогательные данные в Активных панелях.
     * @param obj 
     */
    private _onNavigationChange(obj: any): void {
        // не отображаем панель редактирования транзакции
        this._onEditTransactionCancel();

    }


    private _onEditTransactionShow(obj: any): void {
        let isEdit = (obj !== undefined && obj != null);
        let transactionId: string = isEdit ? <string>obj : "";
        this.__currentEditTransactionId = transactionId;
        this.__isEditTransactionWndShow = true;
    }
    private _onEditTransactionCancel(): void {
        this.__isEditTransactionWndShow = false;
        this.__currentEditTransactionId = "";
    }
    private _onEditTransactionDo(obj: any): void {
        let self = this;
        Actions.loadingStart();
        // TODO: get real Transaction, if edit (from obj data)
        // TODO: add/edit data to the site
        // TODO: show optimistic data ??

        setTimeout(function(){
                self._onFatalError("не реализовано");
        }, 2000);
        

        this._onEditTransactionCancel(); // закрываем окно редактирования

        //Actions.loadingStop();
    }







    /**
     * Обрабатываем сообщения от диспетчера.
     * Обновляем модели данных, обращаемся к серверу.
     * @param type 
     * @param obj 
     */
    onDispatch(type: number, obj: any):boolean {
        switch(type) {

            case ActionTypes.NAVIGATION:
                this._onNavigationChange(obj);
                this.emitChange();
                return true;

            case ActionTypes.LOAD_INIT_DATA:
                this._loadInitDataAsync();
                return true;

            case ActionTypes.ACCOUNTS_LOAD:
                this._loadAccountsAsync((s,m) => { if (!s) { this._onError(m);} this.emitChange(); });
                return true;

            case ActionTypes.TRANSACTIONS_LOAD:
                this._loadTransactionsAsync((s,m) => { if (!s) { this._onError(m);} this.emitChange(); });
                return true;

            case ActionTypes.TRANSACTIONS_EDIT_SHOW:
                this._onEditTransactionShow(obj);
                this.emitChange();
                return true;
            case ActionTypes.TRANSACTIONS_EDIT_CANCEL:
                this._onEditTransactionCancel();
                this.emitChange();
                return true;
            case ActionTypes.TRANSACTIONS_EDIT_DO:
                this._onEditTransactionDo(obj);
                this.emitChange();
                return true;

            // TODO: update transaction filters



            //default:
            //    return true;
        }
        //this.emitChange();
        return true;
    }
    
}

export default new TransactionStore;