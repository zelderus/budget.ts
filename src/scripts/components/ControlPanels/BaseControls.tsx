

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import {TransactionActive} from './../ActivePanels/TransactionActive';
import {IBaseActive} from './../ActivePanels/BaseActive';
import FluxStore from './../../flux/Store';
import FluxUtils from './../../flux/Utils';

export interface IBaseControlsProps { onEventToActive(eventId: number): void; }
export interface IBaseControlsStates {  }

/**
 * Управление - базовое.
 */
export class BaseControls<P extends IBaseControlsProps, S extends IBaseControlsStates> extends View<P, S> {



    constructor(props: any, stores: FluxStore.IStore[]){
        super(props, stores);

    }


    /**
     * Отсылаем сообщение своей Активной панели.
     * @param eventId 
     */
    protected sendEventToActivePanel(eventId: number): void {
        this.props.onEventToActive(eventId);
    }



}