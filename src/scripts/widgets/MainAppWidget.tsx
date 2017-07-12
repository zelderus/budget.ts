
import * as React from "react";
import * as ReactDOM from "react-dom";
import {BaseWidget} from "./BaseWidget";
import {MainControlPanel} from "./../components/MainControlPanel";
import {LogPanel} from "./../components/LogPanel";



/**
 * Основной виджет приложения.
 */
export class MainAppWidget extends BaseWidget {
    _place: HTMLElement;
    _mainDiv: HTMLElement;
    _ctrlDiv: HTMLElement;
    _logDiv: HTMLElement;


    constructor(place: HTMLElement){
        super();
        this._place = place;
        /**
         * Создадим статические веные слои, и внедрим в них отдельные виджеты. Для более удобной (модульной) организации приложения.
         */
        this._mainDiv = document.createElement('div');
        this._place.appendChild(this._mainDiv);
        this._ctrlDiv = document.createElement('div');
        this._place.appendChild(this._ctrlDiv);
        this._logDiv = document.createElement('div');
        this._place.appendChild(this._logDiv);
    }




    public draw() {
        ReactDOM.render(<LogPanel />, this._mainDiv);
        ReactDOM.render(<MainControlPanel title="not" />, this._ctrlDiv);
        ReactDOM.render(<LogPanel />, this._logDiv);
    }


}

export default MainAppWidget;