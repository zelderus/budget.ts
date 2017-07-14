

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';
import Navigation from './../../models/Navigation';


export interface IActionPanelProps { navLines: Navigation.NavigationLine[]; }
export interface IActionPanelStates { navIndex: number; }


/**
 * Основная панель приложения. 
 * Эта часть меняется в зависимости от выбранного пункта навигации, и отображается каждая часть через свою 'Активную Вьюшку'.
 * На основе выбранной вкладки - отображает текущий контент - активную Вьюшку (лежат в '/components/ActivePanels').
 * Все необходимые 'активные вьюшки' связаны с навигацией и инициализируются в '/datas/AppData'.
 */
export class ActionPanel extends View<IActionPanelProps, IActionPanelStates> {

    constructor(props: any){
        super(props, [AppStore]);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IActionPanelStates {
        return {
            navIndex: AppStore.getNavigationIndex()
        };
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
		return <div className="ActionPanel">
            <PanelViewName />
        </div>;
	}


}