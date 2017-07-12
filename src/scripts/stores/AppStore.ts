
//import * as React from "react";
//import * as ReactDOM from "react-dom";

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';



export class AppStore extends BaseStore {

    _logTextValue: string;

    constructor() {
        super();

        this._logTextValue = "лог строка";
    }


    //
    // Функции интерфес для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //

    public getLogText(){
        return this._logTextValue;
    }

    


    /**
     * Обрабатываем сообщения от диспетчера.
     * Обновляем модели данных, обращаемся к серверу.
     * @param type 
     * @param obj 
     */
    onDispatch(type: number, obj: any):boolean {
        switch(type) {
            case ActionTypes.ADD_ITEM:
                this._logTextValue = "adding..";
                break;
            case ActionTypes.DELETE_ITEM:
                this._logTextValue = "deleting..";
                break;
            default:
                return true;
        }
        this.emitChange();
        return true;
    }
    
}

export default new AppStore;