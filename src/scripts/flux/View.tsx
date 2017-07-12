
import * as React from "react";
import FluxUtils from './../flux/Utils';
import FluxStore from './../flux/Store';


/**
 * Вьюшка.
 */
export class View<P, S> extends React.Component<P, S> {

    __myName: string;
    __stores: FluxStore.IStore[];

    constructor(props: any, stores: FluxStore.IStore[]){
        super(props);
        this.__myName = FluxUtils.getClassName(this);
        // устанавливаем состояния
        this.state = this.getState();
        // Сторы, на которые подписываемся
        this.__stores = stores;
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
     */
    protected getState() : S {
        if (this._hasAnyStore()) {
            let storeNames = this.__stores.map(s => FluxUtils.getClassName(s));
            console.log("View '" + this.__myName + "' не переопределил метод 'getState', в котором слушает состояния из Сторов, хотя подписался на '"+storeNames+"'");
        }
        return null;
    }


    ///
    /// Render
    ///
	render(){
		return <div className="ViewErrorBlock">Не реализован View с именем '{this.__myName}'</div>;
	}


}

export default View;