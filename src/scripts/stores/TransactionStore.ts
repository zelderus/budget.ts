
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

    private __accounts: Accounts.AccountLine[] = [];
    private __transactions: Transactions.TransactionLine[] = [];
    private __transactionFilter: Transactions.TransactionFilters;

    private __currentEditTransactionId: string;


    constructor() {
        super();

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
    public getCurrentEditTransactionId(): string { return this.__currentEditTransactionId; }



    //
    // Datas
    //


    /**
     * Первый запрос при запуске приложения. Получаем данные инициализации - на все приложение, и какие-то начальные транзакции.
     */
    private _loadInitDataAsync() {
        Actions.loadingStart();
        //localStorage.clear();

        // инициализация пользователя
        this._authUserAsync((s,m) => {
            if (!s) { this._onFatalError(m); return;}
            if (Life.getUser().isAuth() == false) { this._onFatalError("пользователь не авторизован"); return; }
            Actions.log("вход выполнен пользователем: " + Life.getUser().getName(), false);

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
        })
    }




    private _authUserAsync(callBack: (success:boolean, errorMsg: string) => void) {
        Client.getClient().authentication("username", "pass", (s, m, d) => {    // TODO: !!!!! имя и пароль от ввода пользователя
            Life.setUserAuth(d);
            callBack(s,m);
        });
    }


    private _loadAccountsAsync(callBack: (success:boolean, errorMsg: string) => void) {
        Client.getClient().getAccounts((s, m, d) => { 
            this.__accounts = d;
            callBack(s,m);
        });
    }

    private _loadTransactionsAsync(callBack: (success:boolean, errorMsg: string) => void) {
        Client.getClient().getTransactions(this.__transactionFilter, (s, m, d) => {
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





    private _onEditTransactionShow(obj: any): void {
        let isEdit = (obj !== undefined && obj != null);
        let transactionId: string = isEdit ? <string>obj : "";
        this.__currentEditTransactionId = transactionId;
    }
    private _onEditTransactionDo(obj: any): void { // сохранение формы редактирования транзакции
        let self = this;
        Actions.loadingStart();

        let transaction = <Transactions.TransactionEntity>obj;

        // TODO: 1. отправка данных на сервер

        // TODO: 2. если критическая ошибка - конец

        // 3. если в ответе (в моделе данных) есть ошибки валидации - обновляем модель формы (добавляем ошибки) - конец
        let hasFormError = false;
        if (hasFormError) {
            // TODO: добавляем в модель формы ошибки валидации

            // прячем загрузку и оповещаем об изменениях
            Actions.loadingStop();
            this.emitChange();
            return;
        }
        
        // TODO: 4. если это редактирование и есть такая запись - обновляем ее (иначе добавляем)
        let exist = this.__transactions.filter(f => f.id == transaction.id)[0];
        if (exist != null) {
            exist.cost = transaction.cost;
        }
        // добавляем новую запись
        else {
            
        }

        
        // закрываем окно редактирования
        //this._onEditTransactionCancel(); 
        Actions.navigationBack();
        // прячем загрузку и оповещаем об изменениях
        Actions.loadingStop();
        this.emitChange();
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

            case ActionTypes.TRANSACTIONS_LOAD:
                this._loadTransactionsAsync((s,m) => { if (!s) { this._onError(m);} this.emitChange(); });
                return true;


            case ActionTypes.TRANSACTIONS_EDIT_SHOW:
                this._onEditTransactionShow(obj);
                this.emitChange();
                return true;
            case ActionTypes.TRANSACTIONS_EDIT_DO:
                this._onEditTransactionDo(obj);
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