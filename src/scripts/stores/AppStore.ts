import Life from './../Life';
import Client from './../datas/ClientManager';
import Actions from './../actions/Actions';

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';

import AccountStore from './AccountStore';
import TransactionStore from './TransactionStore';



/**
 * Основное хранилище приложения.
 * Глобальные модели состояний, состяние интерфейса приложения. 
 * Отдельно от изменений транзакций и прочее, чтобы не обновлялись вьюшки с данными.
 */
export class AppStore extends BaseStore {

    private _logTextValue: string;
    private _logIsError: boolean;
    private _errorFatalTextValue: string;
    private _navIndex: number;
    private _tabIndex: number;
    private _navHistory: number[];
    private _isLoading: boolean;

    constructor() {
        super();

        this._logTextValue = "";
        this._logIsError = false;
        this._errorFatalTextValue = "";
        this._navIndex = 1;
        this._tabIndex = 1;
        this._navHistory = [1];
        this._isLoading = false;
    }


    //
    // Функции интерфейсы для Вьюшек.
    // Эти данные для их состояний. При изменении которых, Вьюшки обновляются.
    //

    public getLogText(): string { return this._logTextValue; }
    public getLogIsError(): boolean { return this._logIsError; }
    public getErrorFatalText(): string { return this._errorFatalTextValue; }
    public getNavigationIndex(): number { return this._navIndex; }
    public getTabIndex(): number { return this._tabIndex; }
    public isLoading(): boolean { return this._isLoading; }



    //
    //  Helpers
    //

    // останавливаем анимацию загрузки, оповещаем всех, и навигация назад
    private updateEnd(navBack: boolean = true): void {
        if (navBack) Actions.navigationBack();
        Actions.loadingStop();
        this.emitChange();
    }
    private _onError(msg: string): void {
        Actions.log("Ошибка: " + msg);
    }
    private _onFatalError(msg: string): void {
        Actions.errorFatal(msg);
    }




    //
    // Auth
    //

    private _registrationUserAsync(obj: any) {
        let self = this;
        let userData: [string, string] = obj;
        let userName = userData[0];
        let userPass = userData[1];
        Actions.loadingStart();
        // если уже зарегистрированы // TODO: когда будет реализована панель регистрации и входа, тут убрать эту проверку
        Client.getClient().authentication(userName, userPass, (s, m, d) => {
            Life.setUserAuth(d);
            // проверка
            if (Life.getUser().isAuth() == true) { 
                Actions.log("пользователь уже зарегистрирован: " + Life.getUser().getName(), false);
                self.updateEnd(false);
                // сразу грузим начальные данные свои
                Actions.loadInitData();
                return;
            }
            
            // регистрация // TODO: оставить только эту логику
            Client.getClient().registration(userName, userPass, (s, m, d) => {
                Life.setUserAuth(d);
                // проверка
                if (Life.getUser().isAuth() != true) { self._onFatalError("пользователь не зарегистрирован"); return; }
                Actions.log("зарегистрирован пользователь: " + Life.getUser().getName(), false);
                self.updateEnd(false);
                // сразу грузим начальные данные свои
                Actions.loadInitData();
            });
            
        });
    }

    private _authUserAsync(obj: any) {
        let self = this;
        let userData: [string, string] = obj;
        let userName = userData[0];
        let userPass = userData[1];
        Actions.loadingStart();
        Client.getClient().authentication(userName, userPass, (s, m, d) => {
            Life.setUserAuth(d);
            // проверка
            if (Life.getUser().isAuth() != true) { self._onFatalError("пользователь не авторизован"); return; }
            Actions.log("вход выполнен пользователем: " + Life.getUser().getName(), false);
            self.updateEnd(false);
            // сразу грузим начальные данные свои
            Actions.loadInitData();
        });
    }


    /**
     * Первый запрос при запуске приложения. Получаем данные инициализации - на все приложение, и какие-то начальные транзакции.
     */
    private _loadInitDataAsync() {
        let self = this;
        Actions.loadingStart();
        // валюта
        Actions.loadCurrecnies((s1,m1)=>{
            if (!s1) { self._onFatalError(m1); return;}
            // категории
            Actions.loadCategories((s2,m2)=>{
                if (!s2) { self._onFatalError(m2); return;}
                // счета
                Actions.loadAccounts((s3,m3) => { 
                    if (!s3) { self._onFatalError(m3); return;}
                    // транзакции
                    Actions.loadTransactions((s4,m4) => { 
                        if (!s4) { self._onFatalError(m4); return;}
                        // оповещаем
                        self.updateEnd(false);
                    });
                });
            });
        });
        
    }




    //
    //
    //

    private onNavigationTab(obj: any): void {
        let tabNavTuple: [number, number] = obj;

        this._tabIndex = tabNavTuple[0]; // меняем вкладку
        this.onNavigationClear(); // очищаем историю навигации
        this.onNavigationPage(tabNavTuple[1]); // обновляем навигацию
    }
    private onNavigationClear(): void {
        this._navHistory = [];
    }
    private onNavigationPage(obj: any): void {
        let navIndex = <number>obj;
        this._navIndex = navIndex;
        this._navHistory.push(navIndex);
    }
    private onNavigationBack(): void {
        this._navHistory.pop();
        this._navIndex = this._navHistory[this._navHistory.length-1];
    }


    








    /**
     * Обрабатываем сообщения от диспетчера.
     * Обновляем модели данных, обращаемся к серверу.
     * @param type 
     * @param obj 
     */
    onDispatch(type: number, obj: any, callBack?: StoreFlux.DispatchCallBack):boolean {
        switch(type) {

            case ActionTypes.LOG:
                this._logTextValue = obj.text;
                this._logIsError = obj.isError;  
                break;
            case ActionTypes.ERROR_FATAL:
                this._errorFatalTextValue = obj;            
                break;
            case ActionTypes.ERROR_FATAL_CLOSE:
                this._errorFatalTextValue = "";            
                break;
            case ActionTypes.USER_REGISTRATION:
                this._registrationUserAsync(obj);
                return true;
            case ActionTypes.USER_AUTH:
                this._authUserAsync(obj);
                return true;
            case ActionTypes.NAVIGATION_TAB:
                this.onNavigationTab(obj);
                break;
            case ActionTypes.NAVIGATION_PAGE:
                this.onNavigationPage(obj);
                break;
            case ActionTypes.NAVIGATION_BACK:
                this.onNavigationBack();
                break;
            case ActionTypes.LOADING_START:
                this._isLoading = true;
                break;
            case ActionTypes.LOADING_STOP:
                this._isLoading = false;
                break;
            case ActionTypes.LOAD_INIT_DATA:
                this._loadInitDataAsync();
                return true;

            default:
                return true;
        }
        this.emitChange(); // ВНИМАНИЕ: если выше break, то сразу отправка подписчикам
        return true;
    }
    
}

export default new AppStore;