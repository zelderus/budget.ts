

import * as React from "react";
import Actions from './../actions/Actions';
import View from './../flux/View';
import AppStore from './../stores/AppStore';

export interface IMainControlPanelProps { title: string; }
export interface IMainControlPanelStates {  }


/**
 * Основные кнопки управления
 */
export class MainControlPanel extends View<IMainControlPanelProps, IMainControlPanelStates> {

    constructor(props: any){
        super(props, []);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IMainControlPanelStates {
        return {
            
        };
    }
    


    ///
    /// User interactions
    ///

    private onButtonAdd(){
        Actions.addItem({t:'bebebeee'});
    }
    private onButtonDelete(){
        Actions.deleteItem(null);
    }


    ///
    /// Render
    ///

    private drawButtons(){
        return <div className="Buttons">
            <div className="Button" onClick={e => this.onButtonAdd()}>Add</div>
            <div className="Button" onClick={e => this.onButtonDelete()}>Delete</div>
        </div>
    }

	render(){

        let buttons = this.drawButtons();

		return <div className="MainControlPanel" data-p1={this.props.title}>
            {buttons}
        </div>;
	}


}