
import * as React from "react";
import * as ReactDOM from "react-dom";

//import * as DescWidget from "./widgets/appdesc";
import {AppDescWidget} from "./widgets/appdesc";
import * as AppWidget from "./widgets/appnotyet";

/**
 * Приложение.
 */
export class ZeApp{
    _mainDiv: HTMLElement;
    _wrapDiv: HTMLElement;
    _emptyStr: string;
    _descDiv: HTMLElement;
    _appDiv: HTMLElement;

    _widgetDescription: IWidget;
    _widgetApp: IWidget;

    constructor(mainDivId: string){
        this._mainDiv = document.getElementById(mainDivId);
        //- оборачиваем
        this._wrapDiv = document.createElement('div');
        this._mainDiv.appendChild(this._wrapDiv);
        this._mainDiv.className += " AppWrapper";

        //- слой для описания
        this._descDiv = document.createElement('div');
        this._wrapDiv.appendChild(this._descDiv);
        //- слой для приложения
        this._appDiv = document.createElement('div');
        this._wrapDiv.appendChild(this._appDiv);

        this.initWidgets();
    }


    // инициализация виджетов
    private initWidgets(){
        this._widgetDescription = new AppDescWidget(this._descDiv);
        this._widgetApp = new AppWidget.AppNotYetWidget(this._appDiv);
    }



    public start(){
        this._widgetDescription.draw();
        this._widgetApp.draw();
        // TODO:
    }





}