
import * as React from "react";
import FluxUtils from './../flux/Utils';
import FluxStore from './../flux/Store';
import * as Actions from './../actions/Actions';


/**
 * Вьюшка.
 */
export class View<P, S> extends React.Component<P, S> {

    __myName: string;
    __stores: FluxStore.IStore[];

    constructor(props: any, stores: FluxStore.IStore[]){
        super(props);
        this.__myName = FluxUtils.getClassName(this);
        // Сторы, на которые подписываемся
        this.__stores = stores;

        // устанавливаем состояния - !!! выполняется последним, после всей инициализации объекта !!!
        this.state = this.getState(); // такая форма записи обновления состояний позволительна только в конструкторе вьюшек
    }


    private _hasAnyStore(): boolean {
        return this.__stores != null && this.__stores != undefined && this.__stores.length > 0;
    }

    /**
     * Начинаем слушать Сторы.
     * Если наследующая Вьюшка переопределит этот метод, не забыть вызвать этот базовый super.componentDidMount();
     */
    componentDidMount () {
        if (this._hasAnyStore()) {
            this.__stores.forEach(store => store.addChangeListener(this._onChange, this));
        }
    }
    /**
     * Больше не слушаем Сторы.
     * Если наследующая Вьюшка переопределит этот метод, не забыть вызвать этот базовый super.componentWillUnmount();
     */
    componentWillUnmount () {
        if (this._hasAnyStore()) {
            this.__stores.forEach(store => store.removeChangeListener(this._onChange));
            this.__stores = null;
        }
    }
    /**
     * Произошло изменение в зависимых Сторах, обновляем свое состояние.
     */
    private _onChange () {
        this.setState(this.getState());
    }



    /**
     * Интересующие нас состояния (получаем их строго из Сторов)
     * Если наследующая вьюшка слушает Сторы, то обязана переопределить этот метод и вернуть необходимый объект.
     */
    protected getState() : S {
        if (this._hasAnyStore()) {
            let storeNames = this.__stores.map(s => FluxUtils.getClassName(s));
            FluxUtils.logError("Вьюшка '" + this.__myName + "' не переопределила метод 'getState', в котором слушает состояния из Сторов, хотя подписалась на '"+storeNames+"'");
        }
        return null;
    }


    /**
     * ActionCreator - система сообщений, через которую все компоненты оповещают приложение о новых событиях в одном направлении.
     * - этот метод можно использовать, если лень импортировать пространство имен ('import Actions from './actions/Actions';')
     */
    protected getActionCreator(): Actions.Actions.ActionCreator {
        return Actions.default;
    }




    ///
    /// Render
    ///
	render(){
		return <div className="ViewErrorBlock">Не реализован View с именем '{this.__myName}'</div>;
	}


}

export default View;