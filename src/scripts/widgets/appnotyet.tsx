
import * as React from "react";
import * as ReactDOM from "react-dom";
import {AppNotYet} from "./../components/App/appnotyet";


/**
 * Виджет приложения. В разработке.
 */
export class AppNotYetWidget implements IWidget {
    _place: HTMLElement;

    constructor(place: HTMLElement){
        this._place = place;
    }

    public draw(){
        ReactDOM.render(<AppNotYet />, this._place);
    }


}

export default AppNotYetWidget;