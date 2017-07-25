

import * as React from "react";
import View from './../../flux/View';
import FluxStore from './../../flux/Store';
import FluxUtils from './../../flux/Utils';




export interface IBaseActive { onEventFromControls(eventId: number): void;  }

export interface IBaseActiveProps { }

/**
 * Активная панель - базовая.
 */
export class BaseActive<S> extends View<IBaseActiveProps, S> implements IBaseActive {

    // !!!
    // теперь нет смысла передавать props - Активные панели создаются в ActionPanel и передача свойств строго в нем (своих личных иметь не могут Активки)
    // !!!
    //export class BaseActive<P extends IBaseActiveProps,S> extends View<P, S> implements IBaseActive {

    constructor(props: any, stores: FluxStore.IStore[]){
        super(props, stores);

    }



    /**
     * Получили событие от управления.
     * @param eventName 
     */
    public onEventFromControls(eventId: number): void {
        let msg = "Активная панель '" + FluxUtils.getClassName(this) + "' не переопределила метод 'onEventFromControls', хотя получила событие '"+eventId+"'";
        FluxUtils.logError(msg);
        this.getActionCreator().log(msg, true);
    }
 




}