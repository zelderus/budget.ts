

import * as React from "react";
import View from './../../flux/View';
import {NavigationPanel} from "./NavigationPanel";
import {ActionPanel} from "./ActionPanel";
import {ControlPanel} from "./ControlPanel";
import AppData from './../../datas/AppData';
import AppStore from './../../stores/AppStore';

export interface IMainPanelProps { }
export interface IMainPanelStates { isLoading: boolean;  }


/**
 * Основная панель
 */
export class MainPanel extends View<IMainPanelProps, IMainPanelStates> {

    constructor(props: any){
        super(props, [AppStore]);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IMainPanelStates {
        return {
            isLoading: AppStore.isLoading()
        };
    }



    ///
    /// Render
    ///

    renderLoading() {
        if (!this.state.isLoading) return null;
        
        return <div className="LoadingPanel">
            <div className="Content">
                <div className="Pic"></div>
                <div className="Title">Загрузка данных..</div>
            </div>
        </div>
    }

	render(){
        let navs = AppData.getNavigations();
        let loadingPanel = this.renderLoading();

		return <div className="MainPanel">
            {loadingPanel}
            <NavigationPanel navLines={navs} />
            <ActionPanel navLines={navs} />
            <ControlPanel />
        </div>;
	}


}