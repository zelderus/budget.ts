

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';
import Navigation from './../../models/Navigation';

export interface INavigationPanelProps { navLines: Navigation.NavigationLine[]; }
export interface INavigationPanelStates { navIndex: number;  }


/**
 * Навигация (расходы, доходы, бюджет, статистика..)
 */
export class NavigationPanel extends View<INavigationPanelProps, INavigationPanelStates> {

    constructor(props: any){
        super(props, [AppStore]);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : INavigationPanelStates {
        return {
            navIndex: AppStore.getNavigationIndex()
        };
    }



    ///
    /// User interactions
    ///

    private onNavClick(navIndex: number) {
        if (navIndex == this.state.navIndex) return false; // хоть и ничего не обновится, если не изменилось, все же поможем ничего не делать (расслабим React)
        this.getActionCreator().navigation(navIndex);
    }


    ///
    /// Render
    ///

    // контент кнопки
    renderButtonLine(navLine: Navigation.NavigationLine) {
        let activeNavIndex = this.state.navIndex; // текущая вкладка (меняется через диспетчера)
        let classNameExt = activeNavIndex==navLine.navIndex ? 'Active' : '';
        let classNameFull = "Button " + classNameExt;
        // разница с привязкой обработчиков
        if (navLine.navIndex == this.state.navIndex) // по текущей вкладке тыкать незачем
            return <div className={classNameFull} >{navLine.title}</div>;
        else 
            return <div className={classNameFull} onClick={e => this.onNavClick(navLine.navIndex) }>{navLine.title}</div>;
    }


	render() {
        // все кнопки
        let lines = this.props.navLines.map(line => { return this.renderButtonLine(line) });

		return <div className="NavigationPanel">
            {lines}
        </div>;
	}


}