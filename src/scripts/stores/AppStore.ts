

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';


/**
 * Основное хранилище приложения.
 * Глобальные модели состояний, состяние интерфейса приложения. 
 * Отдельно от изменений транзакций и прочее, чтобы не обновлялись вьюшки с данными.
 */
export class AppStore extends BaseStore {

    _logTextValue: string;
    _navIndex: number;
    _isLoading: boolean;

    constructor() {
        super();

        this._logTextValue = "";
        this._navIndex = 1;
        this._isLoading = true;
    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //

    public getLogText() { return this._logTextValue; }
    public getNavigationIndex() { return this._navIndex; }
    public isLoading() { return this._isLoading; }




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
            case ActionTypes.NAVIGATION:
                this._navIndex = obj;
                break;
            case ActionTypes.LOADING_START:
                this._isLoading = true;
                break;
            case ActionTypes.LOADING_STOP:
                this._isLoading = false;
                break;

            default:
                return true;
        }
        this.emitChange();
        return true;
    }
    
}

export default new AppStore;