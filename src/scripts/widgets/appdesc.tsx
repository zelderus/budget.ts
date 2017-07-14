
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ComDesc from "./../components/App/appdesc";


/**
 * Виджет вывода описания приложения.
 */
export class AppDescWidget implements IWidget {
    _place: HTMLElement;

    constructor(place: HTMLElement){
        this._place = place;
    }

    public draw(){
        ReactDOM.render(<ComDesc.AppDesc title="nothing" />, this._place);
    }


}