

import ActionTypes from './ActionTypes';
import Dispatcher from './../flux/Dispatcher';


/**
 *      Action Creator - методы, как singleton - доступны из всего приложения
 *  Все действия приложения, которые через диспетчера оповестят интересующихся
 */
namespace Actions{


    export function addItem(item: any){ // TODO: item cast to Type
        Dispatcher.dispatch(ActionTypes.ADD_ITEM, item);
    }

    export function deleteItem(id: AAGUID){
        Dispatcher.dispatch(ActionTypes.DELETE_ITEM, id);
    }

}




export default Actions;