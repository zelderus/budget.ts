
import {EventEmitter, EventSubscription} from "fbemitter";
import StoreFlux from './../flux/store';
import FluxUtils from './../flux/Utils';

//type StoreCallback = () => any;


/**
 * Базовый стор.
 *      Его наследуют сторы приложения, и они, как правило, должны быть синглетонами (export new default SomeStore;).
 *      Их используют в любой части приложения (виджеты, компоненты, контайнеры) для подписки на них (addChangeListener), в случае изменений данных.
 *      Подписавшиеся, получая событие от стора на изменение, обновляют свои состояния (получают от Стора объект и обновляя свой state), соответственно React обновит их.
 */
export class BaseStore implements StoreFlux.IStore {
    __myName: string;
    __emitter: EventEmitter;
    __changeEvent: string;

    constructor() {
        this.__myName = FluxUtils.getClassName(this);
        this.__emitter = new EventEmitter();
        this.__changeEvent = 'change';
    }


    __invokeOnDispatch(payload: Object): void {
        //this.__changed = false;
        //this.__onDispatch(payload);
        //if (this.__changed) {
            this.__emitter.emit(this.__changeEvent);
        //}
    }
    /**
     * Реализующий Стор, должен вызывать этот метод, когда произошли хоть какие изменения в моделях (после сообщения диспетчера, в методе 'onDispatch').
     */
    public emitChange() {
        this.__invokeOnDispatch(null);
    }
    // Add change listener
    public addChangeListener(callback: StoreFlux.StoreCallback, s: any): EventSubscription {
        var token = this.__emitter.addListener(this.__changeEvent, callback, s);
        return token;
    }
    // Remove change listener
    public removeChangeListener(callback: StoreFlux.StoreCallback) {
        //this.__emitter.removeAllListeners()
    }

    /**
     * Получили сообщение от диспетчера. Наследующий обязуется реализовать его.
     * @param type 
     * @param obj 
     */
    public onDispatch(type: number, obj: any):boolean {
        FluxUtils.logError("'" + this.__myName + "' не переопределил метод 'onDispatch' из базового BaseStore");
        return false;
        /*
        * Must be like:
        *
        switch(type) {
            case ActionTypes.ADD_ITEM:
                this._someValue = "adding.."; // work with data
                break;
            case ActionTypes.DELETE_ITEM:
                this._someValue = "deleting.."; // work with data
                break;
            default:
                return true;
        }
        this.emitChange();
        return true;
        */
    }

   

    
}

export default BaseStore;