

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';
import Navigation from './../../models/Navigation';

export interface INavigationPanelProps { tabLines: Navigation.TabLine[]; }
export interface INavigationPanelStates { tabIndex: number; navIndex: number;  }


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
            tabIndex: AppStore.getTabIndex(),
            navIndex: AppStore.getNavigationIndex()
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
        let activeNavIndex = this.state.navIndex; // текущая Активная панель (меняется через диспетчера)

        let classNameFull = "Button ";
        // разница с привязкой обработчиков
        if (navLine.tabIndex == activeTabIndex && navLine.navIndex == activeNavIndex) { // по текущей вкладке тыкать незачем
            let classNameExt = "Active";
            return <div className={classNameFull + classNameExt} >{navLine.title}</div>;
        }
        else if (navLine.tabIndex == activeTabIndex) { // текущая вкладка, но не Активная панель
            let classNameExt = "Active NotPanel";
            return <div className={classNameFull + classNameExt} onClick={e => this.onNavClick(navLine.tabIndex, navLine.navIndex) }>{navLine.title}</div>;
        }
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