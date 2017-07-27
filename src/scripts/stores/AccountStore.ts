
import Life from './../Life';

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';
import Actions from './../actions/Actions';

import Accounts from './../models/Accounts';

import Client from './../datas/ClientManager';


/**
 * Хранилище со счетами.
 */
export class AccountStore extends BaseStore {

    private __accounts: Accounts.AccountEntity[] = [];


    constructor() {
        super();

    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    public getAccounts(): Accounts.AccountEntity[] { return this.__accounts; }




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
    public loadAccountsAsync(callBack: (success:boolean, errorMsg: string) => void) { return this._loadAccountsAsync(callBack); }






    //
    //  UI
    //






    /**
     * Обрабатываем сообщения от диспетчера.
     * Обновляем модели данных, обращаемся к серверу.
     * @param type 
     * @param obj 
     */
    onDispatch(type: number, obj: any, callBack?: (success:boolean)=>void):boolean {
        switch(type) {


            case ActionTypes.ACCOUNTS_LOAD:
                this._loadAccountsAsync((s,m) => { if (!s) { this._onError(m);} this.emitChange(); if (callBack != null) callBack(s); });
                return true;



            //default:
            //    return true;
        }
        //this.emitChange();
        return true;
    }
    
}

export default new AccountStore;