
import Life from './../Life';

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';
import Actions from './../actions/Actions';

import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';

import Client from './../datas/ClientManager';


/**
 * Хранилище с транзакциями
 */
export class TransactionStore extends BaseStore {

    private __transactions: Transactions.TransactionEntity[] = [];
    private __transactionFilter: Transactions.TransactionFilters;

    private __currentEditTransactionId: string = null;


    constructor() {
        super();

        this.__currentEditTransactionId = null;
        this.__transactionFilter = new Transactions.TransactionFilters();

    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    public getTransactions(): Transactions.TransactionEntity[] { return this.__transactions; }
    public getTransactionById(id: string): Transactions.TransactionEntity { if (id === undefined || id == null || id === "") return null; return this.__transactions.filter(f => f.id == id)[0]; }
    public getCurrentEditTransactionId(): string { return this.__currentEditTransactionId; }




    //
    //  Helpers
    //

    // останавливаем анимацию загрузки, оповещаем всех, и навигация назад
    private updateEnd(navBack: boolean = true): void {
        if (navBack) Actions.navigationBack();
        Actions.loadingStop();
        this.emitChange();
    }
    private _onError(msg: string): void {
        Actions.log("Ошибка: " + msg);
    }
    private _onFatalError(msg: string): void {
        Actions.errorFatal(msg);
    }




    //
    // Datas
    //




    private _loadTransactionsAsync(callBack: (success:boolean, errorMsg: string) => void) {
        let self = this;
        Client.getClient().getTransactions(self.__transactionFilter, (s, m, d) => {
            self.__transactions = d;
            callBack(s, m);
        });
    }







    //
    //  UI
    //


    private _onEditTransactionShow(obj: any): void {
        let isEdit = (obj !== undefined && obj != null);
        let transactionId: string = isEdit ? <string>obj : null;
        this.__currentEditTransactionId = transactionId;
    }
    private _onEditTransactionDelete(obj: any): void {
        let self = this;
        Actions.loadingStart();
        let editData: [Transactions.TransactionEntity, boolean] = obj;
        let transaction = editData[0];
        let withRecalculateAccounts = editData[1];
        // удаляем
        Client.getClient().deleteTransaction(transaction.id, withRecalculateAccounts, function(s,m,d){
            if (!s) { self._onFatalError(m); self.emitChange(); return; }
            // обновление данных в приложении (просто загружаем заново данные) - эту часть можно обновить локально
            self._loadTransactionsAsync((ss,mm) => { 
                if (!ss) { self._onFatalError(mm); return;}
                // закончили
                self.updateEnd(true);
                // обновляем счета
                if (withRecalculateAccounts) Actions.loadAccounts();
            });
        });
    }
    private _onEditTransactionDo(obj: any): void { // сохранение формы редактирования транзакции
        let self = this;
        Actions.loadingStart();

        let editData: [Transactions.TransactionEntity, boolean] = obj;
        let transaction = editData[0];
        let withRecalculateAccounts = editData[1];

        // 1. отправка данных на сервер
        Client.getClient().editTransaction(transaction, withRecalculateAccounts, function(s, m, validationForm){
            // 2. если критическая ошибка - конец
            if (!s) { self._onFatalError(m); self.emitChange(); return; }
            // 3. если в ответе (в моделе данных) есть ошибки валидации - обновляем модель формы (добавляем ошибки) - конец
            let hasFormError = validationForm.hasError();
            if (hasFormError) {
                // TODO: добавляем в модель формы ошибки валидации

                // закончили
                self.updateEnd(false);
                return;
            }
            // 4. обновление данных в приложении (просто загружаем заново данные) - эту часть можно обновить локально
            self._loadTransactionsAsync((ss,mm) => { 
                if (!ss) { self._onFatalError(mm); return;}
                // закончили
                self.updateEnd(true);
                // обновляем счета
                if (withRecalculateAccounts) Actions.loadAccounts();
            });
        });
    }







    /**
     * Обрабатываем сообщения от диспетчера.
     * Обновляем модели данных, обращаемся к серверу.
     * @param type 
     * @param obj 
     */
    onDispatch(type: number, obj: any, callBack?: StoreFlux.DispatchCallBack):boolean {
        switch(type) {

            case ActionTypes.TRANSACTIONS_LOAD:
                this._loadTransactionsAsync((s,m) => { if (!s) { this._onError(m);} this.emitChange(); if (callBack != null) callBack(s,m); });
                return true;

            case ActionTypes.TRANSACTIONS_EDIT_SHOW:
                this._onEditTransactionShow(obj);
                this.emitChange();
                return true;
            case ActionTypes.TRANSACTIONS_EDIT_DO:
                this._onEditTransactionDo(obj);
                return true;
            case ActionTypes.TRANSACTIONS_EDIT_DELETE:
                this._onEditTransactionDelete(obj);
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