

import StoreFlux from './../flux/store';
import BaseStore from './../flux/BaseStore';
import ActionTypes from './../actions/ActionTypes';


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
    onDispatch(type: number, obj: any):boolean {
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

            default:
                return true;
        }
        this.emitChange();
        return true;
    }
    
}

export default new AppStore;