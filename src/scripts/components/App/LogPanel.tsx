
import * as React from "react";
import AppStore from './../../stores/AppStore';
import View from './../../flux/View';

export interface ILogPanelProps {  }
export interface ILogPanelStates { logText: string; isError: boolean;  }


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
            logText: AppStore.getLogText(),
            isError: AppStore.getLogIsError()
        };
    }


    ///
    /// Render
    ///
	render(){
        let textStyle = this.state.isError ? "Error" : "Normal";

		return <div className="LogPanel">
            <span>лог: <span className={"Text " + textStyle}>{this.state.logText}</span></span>
        </div>;
	}


}