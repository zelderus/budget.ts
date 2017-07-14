
import * as React from "react";
import AppStore from './../../stores/AppStore';
import View from './../../flux/View';

export interface ILogPanelProps {  }
export interface ILogPanelStates { logText: string  }


/**
 * Лог
 */
export class LogPanel extends View<ILogPanelProps, ILogPanelStates> {

    constructor(props: any){
        super(props, [AppStore]);
    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ILogPanelStates {
        return {
            logText: AppStore.getLogText()
        };
    }


    ///
    /// Render
    ///
	render(){
		return <div className="LogPanel">
            <span>лог: <b>{this.state.logText}</b></span>
        </div>;
	}


}