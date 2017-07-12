

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';


/**
 * Основное хранилище приложения.
 * Глобальные модели состояний.
 */
export class AppStore extends BaseStore {

    _logTextValue: string;

    constructor() {
        super();

        this._logTextValue = "";
    }


    //
    // Функции интерфейсы для Вьюшек.
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
            case ActionTypes.LOG:
                this._logTextValue = obj;            
                break;
            case ActionTypes.ADD_ITEM:
                // TODO: 
                break;
            case ActionTypes.DELETE_ITEM:
                // TODO: 
                break;
            default:
                return true;
        }
        this.emitChange();
        return true;
    }
    
}

export default new AppStore;