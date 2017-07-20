

import * as React from "react";
import View from './../../flux/View';
import {NavigationPanel} from "./NavigationPanel";
import {ActionPanel} from "./ActionPanel";
import {ControlPanel} from "./ControlPanel";
import AppData from './../../datas/AppData';
import AppStore from './../../stores/AppStore';

export interface IMainPanelProps { }
export interface IMainPanelStates { isLoading: boolean; fatalMsg: string;  }


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
            isLoading: AppStore.isLoading(),
            fatalMsg: AppStore.getErrorFatalText()
        };
    }


    //
    // UI interactions
    //

    private _onCloseError(): void {
        this.getActionCreator().errorFatalClose();
    }




    ///
    /// Render
    ///

    renderFatal() {
        if (this.state.fatalMsg == null || this.state.fatalMsg == "") return null;
        return <div className="FatalPanel">
            <div className="CloseButton" onClick={e => this._onCloseError()}>X</div>
            <div className="Content">
                <div className="Title">Критическая ошибка</div>
                <div className="Description">{this.state.fatalMsg}</div>
            </div>
        </div>
    }

    renderLoading() {
        if (!this.state.isLoading) return null;
        return <div className="LoadingPanel">
            <div className="Content">
                <div className="Pic"></div>
                <div className="Title">обновление данных..</div>
            </div>
        </div>
    }

	render(){
        let navs = AppData.getNavigations();
        let fatalPanel = this.renderFatal();
        let loadingPanel = this.renderLoading();

		return <div className="MainPanel">
            {fatalPanel}
            {loadingPanel}
            <NavigationPanel navLines={navs} />
            <ActionPanel navLines={navs} />
            {/*<ControlPanel navLines={navs} />*/}
        </div>;
	}


}