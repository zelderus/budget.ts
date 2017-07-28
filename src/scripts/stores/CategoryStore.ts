
import Life from './../Life';

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';
import Actions from './../actions/Actions';

import Categories from './../models/Categories';

import Client from './../datas/ClientManager';


/**
 * Хранилище категорий.
 */
export class CategoryStore extends BaseStore {

    private __categories: Categories.CategoryEntity[] = [];


    constructor() {
        super();

    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //
    public getCategories(): Categories.CategoryEntity[] { return this.__categories; }




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




    private _loadCategoriesAsync(callBack: (success:boolean, errorMsg: string) => void) {
        let self = this;
        Client.getClient().getCategories((s, m, d) => { 
            self.__categories = d;
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

            case ActionTypes.CATEGORIES_LOAD:
                this._loadCategoriesAsync((s,m) => { 
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

export default new CategoryStore;