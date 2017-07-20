

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';
import Navigation from './../../models/Navigation';
import {IBaseActive} from './../ActivePanels/BaseActive';
import FluxUtils from './../../flux/Utils';

export interface IActionPanelProps { navLines: Navigation.NavigationLine[]; }
export interface IActionPanelStates { navIndex: number; }


/**
 * Основная панель приложения. 
 * Эта часть меняется в зависимости от выбранного пункта навигации, и отображается каждая часть через свою 'Активную Вьюшку'.
 * На основе выбранной вкладки - отображает текущий контент - активную Вьюшку (лежат в '/components/ActivePanels').
 * Все необходимые 'активные вьюшки' связаны с навигацией и инициализируются в '/datas/AppData'.
 */
export class ActionPanel extends View<IActionPanelProps, IActionPanelStates> {


    __activePanel: IBaseActive;

    constructor(props: any){
        super(props, [AppStore]);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IActionPanelStates {
        return {
            navIndex: AppStore.getNavigationIndex()
        };
    }




    //
    //
    //

    // подцепляем текущую Активную панель
    private _setActivePanelCallbackToControls(activePanel: IBaseActive): void {
        if (activePanel == null || activePanel === undefined) {
            this.__activePanel = null;
            return;
        }
        this.__activePanel = activePanel;
    }

    // Панель управления послала событие к Активной панели
    private _onSendEventFromControlToActive(eventId: number): void {
        if (this.__activePanel != null) this.__activePanel.onEventFromControls(eventId);
    }




    ///
    /// Render
    ///


    private drawError(msg: string) {
        return <div className="ActiveViewError">{msg}</div>
    }


	render(){
        let curNavIndex = this.state.navIndex;
        let curLine : Navigation.NavigationLine = null;

        //this.props.navLines.forEach(line => { if (line.navIndex == curNavIndex) { curLine = line; return false;} });
        for (let line of this.props.navLines) {
            if (line.navIndex == curNavIndex) { 
                curLine = line; 
                break; // только ради этого
            }
        }

        if (curLine == null || curLine == undefined) 
            return this.drawError("Не найдена активная панель приложения с индексом '"+curNavIndex+"'");

        // динамически определяем компонент (активную вьюшку) и рендерим ее
        let PanelViewName = curLine.viewRef;
        // динамически определяем компонент (контролы) и рендерим ее
        let ControlViewName = curLine.cmdRef;

		return <div>
            <div className="ActionPanel">
                <PanelViewName ref={ (inp:any) => { this._setActivePanelCallbackToControls(inp);} } />
            </div>
            <div className="ControlPanel">
                <ControlViewName onEventToActive={ (eventId:number) => {this._onSendEventFromControlToActive(eventId); }} />
            </div>
        </div>
	}


}