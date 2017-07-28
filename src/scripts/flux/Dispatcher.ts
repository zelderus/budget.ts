
import ActionTypes from './../actions/ActionTypes';
import StoreFlux from './store';

namespace Flux {
   

    export class Dispatcher{

        _stores: StoreFlux.IStore[];

        constructor(){
            //console.log("creating Dispatcher..");
        }

        /**
         * Все интересующиеся в событиях, посланных через Actions.
         */
        public initStores(stores: StoreFlux.IStore[]){
            this._stores = stores;
        }

        /**
         * Произошло событие.
         * @param type Тип события
         * @param obj Объект события
         */
        public dispatch(type: ActionTypes, obj: any, callBack?: StoreFlux.DispatchCallBack){
            this._stores.forEach(store => store.onDispatch(type, obj, callBack));
        }

    }

}



// экспортируем сразу как Singleton
// пример импорта: import Dispatcher from './../flux/Dispatcher';
// пример использования: Dispatcher.dispatch(ActionTypes.ADD_ITEM, item);
export default new Flux.Dispatcher();