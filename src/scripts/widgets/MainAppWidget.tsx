
import * as React from "react";
import * as ReactDOM from "react-dom";
import {MainControlPanel} from "./../components/MainControlPanel";
import {LogPanel} from "./../components/LogPanel";

/**
 * Основной виджет приложения.
 */
export class MainAppWidget implements IWidget {
    _place: HTMLElement;
    _ctrlDiv: HTMLElement;
    _logDiv: HTMLElement;


    constructor(place: HTMLElement){
        this._place = place;

        this._ctrlDiv = document.createElement('div');
        this._place.appendChild(this._ctrlDiv);
        this._logDiv = document.createElement('div');
        this._place.appendChild(this._logDiv);
    }




    public draw(){
        ReactDOM.render(<MainControlPanel title="not" />, this._ctrlDiv);
        ReactDOM.render(<LogPanel />, this._logDiv);
    }


}

export default MainAppWidget;