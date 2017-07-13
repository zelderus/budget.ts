

import ActionTypes from './ActionTypes';
import Dispatcher from './../flux/Dispatcher';


/**
 *      Action Creator - методы, как singleton - доступны из всего приложения
 *  Все действия приложения, которые через диспетчера оповестят интересующихся
 */
export namespace Actions{

    /**
     * Менеджер действий. Сообщает диспетчеру о новых событиях.
     * - функции обернуты в класс, чтобы можно было их возвращать наследуемым объектам (для удобства использования), как в 'flux/View.tsx'.
     */
    export class ActionCreator {

        constructor() {

        }

        
        log(msg: string) {
            Dispatcher.dispatch(ActionTypes.LOG, msg);
        }

        navigation(navIndex: number) {
            Dispatcher.dispatch(ActionTypes.NAVIGATION, navIndex);
            this.log("навигация: " + navIndex);
        }



        addItem(item: any){ // TODO: item cast to Type
            Dispatcher.dispatch(ActionTypes.ADD_ITEM, item);
            this.log("добавление элемента: ..");
        }

        deleteItem(id: AAGUID){
            Dispatcher.dispatch(ActionTypes.DELETE_ITEM, id);
            this.log("удаление элемента: " + id);
        }

    }


}




//export default Actions;
export default new Actions.ActionCreator;