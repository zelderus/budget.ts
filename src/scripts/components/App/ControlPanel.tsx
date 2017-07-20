





//
// УСТАРЕЛО !!!!
// панели Контролов рендерятся теперь в ActionPanel
//


import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';
import Navigation from './../../models/Navigation';


export interface IControlPanelProps { navLines: Navigation.NavigationLine[]; }
export interface IControlPanelStates { navIndex: number; }


/**
 * Основные кнопки управления
 */
export class ControlPanel extends View<IControlPanelProps, IControlPanelStates> {

    constructor(props: any){
        super(props, [AppStore]);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IControlPanelStates {
        return {
            navIndex: AppStore.getNavigationIndex()
        };
    }



    ///
    /// Render
    ///


    private drawError(msg: string) {
        return <div className="ControlViewError">{msg}</div>
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
            return this.drawError("Не найдена панель управления от навигации с индексом '"+curNavIndex+"'");

        // динамически определяем компонент (вьюшку) и рендерим ее
        let PanelViewName = curLine.cmdRef;
		return <div className="ControlPanel">
            <PanelViewName />
        </div>;


	}


}