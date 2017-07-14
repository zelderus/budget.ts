

import * as React from "react";
import View from './../../flux/View';
import {NavigationPanel} from "./NavigationPanel";
import {ActionPanel} from "./ActionPanel";
import {ControlPanel} from "./ControlPanel";
import AppData from './../../datas/AppData';


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

	render(){
        let navs = AppData.getNavigations();

		return <div className="MainPanel">
            <NavigationPanel navLines={navs} />
            <ActionPanel navLines={navs} />
            <ControlPanel />
        </div>;
	}


}