

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

        
        log(msg: string, isError: boolean = false) {
            let logModel: any = { text: msg, isError: isError};
            Dispatcher.dispatch(ActionTypes.LOG, logModel);
        }
        errorFatal(msg: string) {
            Dispatcher.dispatch(ActionTypes.ERROR_FATAL, msg);
            Dispatcher.dispatch(ActionTypes.LOADING_STOP, null); // критическая ошибка выпадает при загрузках, значит тут всегда сами отключаем панель загрузки
        }
        errorFatalClose() {
            Dispatcher.dispatch(ActionTypes.ERROR_FATAL_CLOSE, null);
        }
        navigation(navIndex: number) {
            Dispatcher.dispatch(ActionTypes.NAVIGATION, navIndex);
        }

        loadInitData() {
            Dispatcher.dispatch(ActionTypes.LOAD_INIT_DATA, null);
        }

        loadingStart() {
            Dispatcher.dispatch(ActionTypes.LOADING_START, null);
        }
        loadingStop() {
            Dispatcher.dispatch(ActionTypes.LOADING_STOP, null);
        }

        loadAccounts() {
            Dispatcher.dispatch(ActionTypes.ACCOUNTS_LOAD, null);
        }

        loadTransactions() {
            Dispatcher.dispatch(ActionTypes.TRANSACTIONS_LOAD, null);
        }


        editTransactionShow(id: string) {
            Dispatcher.dispatch(ActionTypes.TRANSACTIONS_EDIT_SHOW, id);
        }
        editTransactionCancel() {
            Dispatcher.dispatch(ActionTypes.TRANSACTIONS_EDIT_CANCEL, null);
        }
        editTransactionDo(obj: any) { // TODO: fix type of the obj
            Dispatcher.dispatch(ActionTypes.TRANSACTIONS_EDIT_DO, obj);
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