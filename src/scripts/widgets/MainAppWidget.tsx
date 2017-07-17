
import * as React from "react";
import * as ReactDOM from "react-dom";
import {BaseWidget} from "./BaseWidget";
import {MainPanel} from "./../components/App/MainPanel";
import {LogPanel} from "./../components/App/LogPanel";



/**
 * Основной виджет приложения.
 */
export class MainAppWidget extends BaseWidget {
    _mainDiv: HTMLElement;
    _logDiv: HTMLElement;

    constructor(place: HTMLElement){
        super();
        /**
         * Создадим статические вечные слои, и внедрим в них отдельные виджеты. Для более удобной (модульной) организации приложения.
         */
        this._mainDiv = document.createElement('div');
        place.appendChild(this._mainDiv);
        this._logDiv = document.createElement('div');
        place.appendChild(this._logDiv);

        // загружаем начальные данные !!!
        this.getActionCreator().loadInitData();
    }




    public draw() {
        ReactDOM.render(<MainPanel />, this._mainDiv);
        ReactDOM.render(<LogPanel />, this._logDiv);
    }


}

export default MainAppWidget;