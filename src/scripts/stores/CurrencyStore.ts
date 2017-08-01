
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


    constructor() {
        super();

    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    public getCurrecies(): Currencies.CurrencyEntity[] { return this.__currencies; }

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



            //default:
            //    return true;
        }
        //this.emitChange();
        return true;
    }
    
}

export default new CurrencyStore;