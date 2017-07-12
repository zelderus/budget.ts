
import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppDescWidget} from "./widgets/AppDesc";
import AppWidget from "./widgets/MainAppWidget";


import Actions from './actions/Actions';
import Dispatcher from './flux/Dispatcher';
import StoreFlux from './flux/store';

import AppStore from './stores/AppStore';




/**
 * Приложение.
 */
export class ZeApp{
    _descDiv: HTMLElement;
    _appDiv: HTMLElement;


    constructor(mainDivId: string){
        let mainDiv = document.getElementById(mainDivId);
        /*** 
         * Статические вечные слои. Они никогда не меняются и незачем их рендерить React'ом.
         * **/
        //- оборачиваем
        let wrapDiv = document.createElement('div');
        mainDiv.appendChild(wrapDiv);
        mainDiv.className += " AppWrapper";
        //- слой для описания
        this._descDiv = document.createElement('div');
        wrapDiv.appendChild(this._descDiv);
        //- слой для приложения
        this._appDiv = document.createElement('div');
        wrapDiv.appendChild(this._appDiv);
    }





    /**
     * Все хранилища приложения.
     */
    private getStores(): StoreFlux.IStore[] {
        return [AppStore];
    }



    public start(){
        // инициализируем диспетчера
        Dispatcher.initStores(this.getStores());
        // основные виджеты
        let widgetDescription = new AppDescWidget(this._descDiv);
        let widgetApp = new AppWidget(this._appDiv);
        // отображаем виджеты
        widgetDescription.draw();
        widgetApp.draw();
    }





}