

import ActionTypes from './ActionTypes';
import Dispatcher from './../flux/Dispatcher';
import AppData from './../datas/AppData';
import StoreFlux from './../flux/store';

import Accounts from './../models/Accounts';
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
        private navigationPage(navIndex: AppData.Pages) { // навигация между Активными панелями (напрямую не используем, ниже конкретизация со своими моделями для передачи)
            Dispatcher.dispatch(ActionTypes.NAVIGATION_PAGE, navIndex);
        }
        navigationBack() {
            Dispatcher.dispatch(ActionTypes.NAVIGATION_BACK, null);
        }

        userRegistration(userName: string, userPass: string): void {
            let userData: [string, string] = [userName, userPass];
            Dispatcher.dispatch(ActionTypes.USER_REGISTRATION, userData);
        }
        userAuthorization(userName: string, userPass: string): void {
            let userData: [string, string] = [userName, userPass];
            Dispatcher.dispatch(ActionTypes.USER_AUTH, userData);
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




        loadCurrecnies(callBack?: StoreFlux.DispatchCallBack) {
            Dispatcher.dispatch(ActionTypes.CURRENCIES_LOAD, null, callBack);
        }

        loadCategories(callBack?: StoreFlux.DispatchCallBack) {
            Dispatcher.dispatch(ActionTypes.CATEGORIES_LOAD, null, callBack);
        }

        loadAccounts(callBack?: StoreFlux.DispatchCallBack) {
            Dispatcher.dispatch(ActionTypes.ACCOUNTS_LOAD, null, callBack);
        }

        loadTransactions(callBack?: StoreFlux.DispatchCallBack) {
            Dispatcher.dispatch(ActionTypes.TRANSACTIONS_LOAD, null, callBack);
        }





        editAccountShow(id: string) {
            Dispatcher.dispatch(ActionTypes.ACCOUNTS_EDIT_SHOW, id);
            this.navigationPage(AppData.Pages.ACCOUNT_EDIT);
        }
        editAccountDo(obj: Accounts.AccountEntity) {
            let model: [Accounts.AccountEntity] = [ obj ];
            Dispatcher.dispatch(ActionTypes.ACCOUNTS_EDIT_DO, model);
        }
        editAccountDelete(obj: Accounts.AccountEntity) {
            let model: [Accounts.AccountEntity] = [ obj ];
            Dispatcher.dispatch(ActionTypes.ACCOUNTS_EDIT_DELETE, model);
        }
        /*editAccountValidate(obj: Accounts.AccountFormValidation) {
            Dispatcher.dispatch(ActionTypes.ACCOUNTS_EDIT_VALIDATOR, obj);
        }*/


        editTransactionShow(id: string) {
            Dispatcher.dispatch(ActionTypes.TRANSACTIONS_EDIT_SHOW, id);
            this.navigationPage(AppData.Pages.TRANSACTION_EDIT);
        }
        editTransactionDo(obj: Transactions.TransactionEntity, withCalculateAccounts: boolean) {
            let model: [Transactions.TransactionEntity, boolean] = [obj, withCalculateAccounts];
            Dispatcher.dispatch(ActionTypes.TRANSACTIONS_EDIT_DO, model);
        }
        editTransactionDelete(obj: Transactions.TransactionEntity, withCalculateAccounts: boolean) {
            let model: [Transactions.TransactionEntity, boolean] = [ obj, withCalculateAccounts];
            Dispatcher.dispatch(ActionTypes.TRANSACTIONS_EDIT_DELETE, model);
        }
        /*editTransactionValidate(obj: Transactions.TransactionFormValidation) {
            Dispatcher.dispatch(ActionTypes.TRANSACTIONS_EDIT_VALIDATOR, obj);
        }*/





    }


}




//export default Actions;
export default new Actions.ActionCreator;