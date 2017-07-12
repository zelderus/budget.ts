
import * as React from "react";
import AppStore from './../stores/AppStore';
import View from './../flux/View';

export interface ILogPanelProps {  }
export interface ILogPanelStates { someVal: string  }


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
            someVal: AppStore.getLogText()
        };
    }


    ///
    /// Render
    ///
	render(){
		return <div className="LogPanel">
            {this.state.someVal}
        </div>;
	}


}