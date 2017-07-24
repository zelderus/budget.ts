

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';
import Navigation from './../../models/Navigation';

export interface INavigationPanelProps { tabLines: Navigation.TabLine[]; }
export interface INavigationPanelStates { tabIndex: number;  }


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
            tabIndex: AppStore.getTabIndex()
        };
    }



    ///
    /// User interactions
    ///

    private onNavClick(tabIndex: number, navIndex: number) {
        // TODO: если текущая вкладка, и текущая Активка, то не работаем

        // меняем вкладку и Активку
        this.getActionCreator().navigationTab(tabIndex, navIndex);
    }


    ///
    /// Render
    ///

    // контент кнопки
    renderButtonLine(navLine: Navigation.TabLine) {
        let activeTabIndex = this.state.tabIndex; // текущая вкладка (меняется через диспетчера)
        let classNameExt = activeTabIndex==navLine.tabIndex ? 'Active' : '';
        let classNameFull = "Button " + classNameExt;
        // разница с привязкой обработчиков
        if (navLine.tabIndex == activeTabIndex) // по текущей вкладке тыкать незачем
            return <div className={classNameFull} >{navLine.title}</div>;
        else 
            return <div className={classNameFull} onClick={e => this.onNavClick(navLine.tabIndex, navLine.navIndex) }>{navLine.title}</div>;
    }


	render() {
        // все кнопки
        let lines = this.props.tabLines.map(line => { return this.renderButtonLine(line) });

		return <div className="NavigationPanel">
            {lines}
        </div>;
	}


}