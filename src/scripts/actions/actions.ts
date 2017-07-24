

import ActionTypes from './ActionTypes';
import Dispatcher from './../flux/Dispatcher';
import AppData from './../datas/AppData';

import Transactions from './../models/Transactions';



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
        navigationTab(tabIndex: number, navIndex: number) {
            let tabNavTuple: [number, number];
            tabNavTuple = [tabIndex, navIndex];
            Dispatcher.dispatch(ActionTypes.NAVIGATION_TAB, tabNavTuple);
        }
        private navigationPage(navIndex: AppData.NavigationActivePages) { // навигация между Активными панелями (напрямую не используем, ниже конкретизация со своими моделями для передачи)
            Dispatcher.dispatch(ActionTypes.NAVIGATION_PAGE, navIndex);
        }
        navigationBack() {
            Dispatcher.dispatch(ActionTypes.NAVIGATION_BACK, null);
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
            this.navigationPage(AppData.NavigationActivePages.TRANSACTION_EDIT); // index из AppSata.getNavigations()
        }
        editTransactionDo(obj: Transactions.TransactionEntity) {
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