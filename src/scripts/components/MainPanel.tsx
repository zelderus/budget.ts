

import * as React from "react";
import View from './../flux/View';
import AppStore from './../stores/AppStore';
import {ControlPanel} from "./../components/ControlPanel";


export interface IMainPanelProps { }
export interface IMainPanelStates {  }


/**
 * Основная панель
 */
export class MainPanel extends View<IMainPanelProps, IMainPanelStates> {

    constructor(props: any){
        super(props, []);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IMainPanelStates {
        return {
            
        };
    }





    ///
    /// Render
    ///

    private drawSome(){
        return <div>
            some....
        </div>
    }

	render(){

        let some = this.drawSome();

		return <div className="MainPanel">
            {some}
            <ControlPanel title="not" />
        </div>;
	}


}