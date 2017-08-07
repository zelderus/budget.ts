
import Life from './../Life';

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';
import Actions from './../actions/Actions';
import Collections from './../utils/Collections';

import Accounts from './../models/Accounts';

import Client from './../datas/ClientManager';


/**
 * Хранилище со счетами.
 */
export class AccountStore extends BaseStore {

    private __accounts: Accounts.AccountEntity[] = [];
    private __currentEditId: string = null;
    private __currentEditAccountModel: Accounts.AccountEntity;
    private __formValidator: Accounts.AccountFormValidation;

    constructor() {
        super();

        this.__currentEditId = null;
        this.__currentEditAccountModel = null;
        this.__formValidator = new Accounts.AccountFormValidation();
    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    public getAccounts(): Accounts.AccountEntity[] { return this.__accounts; }
    public getAccountsSorted(): Accounts.AccountEntity[] { return this.__accounts.sort((a,b) => a.order < b.order ? -1 : 1); }
    public getDefaultAccountId(): string { let defaultAccount = Collections.first(this.__accounts, (f) => f.isDefault); if (defaultAccount != null) return defaultAccount.id; return this.__accounts.length > 0 ? this.getAccountsSorted()[0].id : null; }
    public getAccountById(id: string): Accounts.AccountEntity { if (id === undefined || id == null || id === "") return null; return this.__accounts.filter(f => f.id == id)[0]; }
    public getCurrentEditAccountId(): string { return this.__currentEditId; }
    public getCurrentEditAccount(): Accounts.AccountEntity { return this.__currentEditAccountModel; }
    public getNextAccountOrder(): number { if (this.__accounts.length == 0) return 9999; let maxOrder = this.__accounts.sort((a,b) => a.order > b.order ? -1 : 1)[0].order; return maxOrder+1; }
    public getFormValidator(): Accounts.AccountFormValidation { return this.__formValidator; }


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




    private _loadAccountsAsync(callBack: (success:boolean, errorMsg: string) => void) {
        let self = this;
        Client.getClient().getAccounts((s, m, d) => { 
            self.__accounts = d;
            callBack(s,m);
        });
    }






    //
    //  UI
    //

    private _onEditShow(obj: any): void {
        let isEdit = (obj !== undefined && obj != null);
        let accountId: string = isEdit ? <string>obj : null;
        this.__currentEditId = accountId;
        this.__formValidator.clearErrors();
        // модель для редактирования
        this.__currentEditAccountModel = null;
        let account = this.getAccountById(this.__currentEditId);
        if (account != null) {
            this.__currentEditAccountModel = account.clone(); // не трогаем реальные данные, работаем с клоном
        }
        else {
            this.__currentEditAccountModel = new Accounts.AccountEntity();
            this.__currentEditAccountModel.id = null;
            this.__currentEditAccountModel.sum = 0;
            this.__currentEditAccountModel.currencyId = null;
            this.__currentEditAccountModel.isCredit = false;
            this.__currentEditAccountModel.creditLimit = 0;
            this.__currentEditAccountModel.order = this.getNextAccountOrder();
        }
    }
    private _onEditDelete(obj: any): void {
        let self = this;
        Actions.loadingStart();
        let editData: [Accounts.AccountEntity] = obj;
        let account = editData[0];
        // удаляем
        Client.getClient().deleteAccount(account.id, function(s,m,d){
            if (!s) { self._onFatalError(m); self.emitChange(); return; }
            // обновление данных в приложении (просто загружаем заново данные) - эту часть можно обновить локально
            self._loadAccountsAsync((ss,mm) => { 
                if (!ss) { self._onFatalError(mm); return;}
                // закончили
                self.updateEnd(true);
            });
        });
    }
    private _onEditDo(obj: any): void { // сохранение формы редактирования
        let self = this;
        Actions.loadingStart();

        let editData: [Accounts.AccountEntity] = obj;
        let account = editData[0];

        // 1. отправка данных на сервер
        Client.getClient().editAccount(account, function(s, m, validationForm){
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
            self._loadAccountsAsync((ss,mm) => { 
                if (!ss) { self._onFatalError(mm); return;}
                // закончили
                self.updateEnd(true);
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

            case ActionTypes.ACCOUNTS_LOAD:
                this._loadAccountsAsync((s,m) => { 
                    if (!s) { this._onError(m);} 
                    this.emitChange(); 
                    if (callBack != null) { callBack(s,m); }
                });
                return true;


            case ActionTypes.ACCOUNTS_EDIT_SHOW:
                this._onEditShow(obj);
                this.emitChange();
                return true;
            case ActionTypes.ACCOUNTS_EDIT_DO:
                this._onEditDo(obj);
                return true;
            case ActionTypes.ACCOUNTS_EDIT_DELETE:
                this._onEditDelete(obj);
                return true;



            //default:
            //    return true;
        }
        //this.emitChange();
        return true;
    }
    
}

export default new AccountStore;