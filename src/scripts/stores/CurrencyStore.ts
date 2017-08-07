
import Life from './../Life';

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';
import Actions from './../actions/Actions';

import Accounts from './../models/Accounts';
import Currencies from './../models/Currencies';

import Client from './../datas/ClientManager';


/**
 * Хранилище валюты.
 */
export class CurrencyStore extends BaseStore {

    private __currencies: Currencies.CurrencyEntity[] = [];
    private __currentEditId: string = null;
    private __currentEditModel: Currencies.CurrencyEntity;
    private __formValidator: Currencies.CurrencyFormValidation;

    constructor() {
        super();

        this.__currentEditModel = null;
        this.__formValidator = new Currencies.CurrencyFormValidation();
    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    public getCurrecies(): Currencies.CurrencyEntity[] { return this.__currencies; }
    public getCurreciesSorted(): Currencies.CurrencyEntity[] { return this.__currencies.sort((a,b) => a.order < b.order ? -1 : 1); }
    public getDefaultCurrencyId(): string { return this.__currencies.length > 0 ? this.getCurreciesSorted()[0].id : null; } //? по умолчанию, возможно будет не первый из списка, а выбранный
    public getCurrencyById(id: string): Currencies.CurrencyEntity { if (id === undefined || id == null || id === "") return null; return this.__currencies.filter(f => f.id == id)[0]; }
    public getCurrentEditCurrencyId(): string { return this.__currentEditId; }
    public getCurrentEditModel(): Currencies.CurrencyEntity { return this.__currentEditModel; }
    public getNextCurrencyOrder(): number { if (this.__currencies.length == 0) return 9999; let maxOrder = this.__currencies.sort((a,b) => a.order > b.order ? -1 : 1)[0].order; return maxOrder+1; }
    public getFormValidator(): Currencies.CurrencyFormValidation { return this.__formValidator; }

    public getCurrencyShowNameByAccount(account: Accounts.AccountEntity): string {
        let notCurrencyShow = "-";
        if (account == null || account.currencyId == null) return notCurrencyShow;
        let currency = this.__currencies.filter(f => f.id == account.currencyId)[0];
        return currency == null ? notCurrencyShow : currency.show;
    }







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




    private _loadCurreciesAsync(callBack: (success:boolean, errorMsg: string) => void) {
        let self = this;
        Client.getClient().getCurrencies((s, m, d) => { 
            self.__currencies = d;
            callBack(s,m);
        });
    }






    //
    //  UI
    //


    private _onEditShow(obj: any): void {
        let isEdit = (obj !== undefined && obj != null);
        let currencyId: string = isEdit ? <string>obj : null;
        this.__currentEditId = currencyId;
        this.__formValidator.clearErrors();
        // модель для редактирования
        this.__currentEditModel = null;
        let currency = this.getCurrencyById(this.__currentEditId);
        if (currency != null) {
            this.__currentEditModel = currency.clone(); // не трогаем реальные данные, работаем с клоном
        }
        else {
            this.__currentEditModel = new Currencies.CurrencyEntity();
            this.__currentEditModel.id = null;
            this.__currentEditModel.order = this.getNextCurrencyOrder();
        }
    }
    private _onEditDo(obj: any): void { // сохранение формы редактирования
        let self = this;
        Actions.loadingStart();

        let editData: [Currencies.CurrencyEntity] = obj;
        let currency = editData[0];

        // 1. отправка данных на сервер
        Client.getClient().editCurrency(currency, function(s, m, validationForm){
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
            self._loadCurreciesAsync((ss,mm) => { 
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

            case ActionTypes.CURRENCIES_LOAD:
                this._loadCurreciesAsync((s,m) => { 
                    if (!s) { this._onError(m);} 
                    this.emitChange(); 
                    if (callBack != null) { callBack(s,m); }
                });
                return true;

            case ActionTypes.CURRENCIES_EDIT_SHOW:
                this._onEditShow(obj);
                this.emitChange();
                return true;
            case ActionTypes.CURRENCIES_EDIT_DO:
                this._onEditDo(obj);
                return true;


            //default:
            //    return true;
        }
        //this.emitChange();
        return true;
    }
    
}

export default new CurrencyStore;