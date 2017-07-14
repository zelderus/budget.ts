

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';


/**
 * Хранилище с транзакциями
 */
export class TransactionStore extends BaseStore {

    constructor() {
        super();

        
    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //

    public getSome() { return ""; }






    /**
     * Обрабатываем сообщения от диспетчера.
     * Обновляем модели данных, обращаемся к серверу.
     * @param type 
     * @param obj 
     */
    onDispatch(type: number, obj: any):boolean {
        switch(type) {

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

export default new TransactionStore;