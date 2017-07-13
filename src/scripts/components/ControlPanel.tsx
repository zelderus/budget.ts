

import * as React from "react";
import View from './../flux/View';
import AppStore from './../stores/AppStore';

export interface IControlPanelProps {  }
export interface IControlPanelStates {  }


/**
 * Основные кнопки управления
 */
export class ControlPanel extends View<IControlPanelProps, IControlPanelStates> {

    constructor(props: any){
        super(props, []);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IControlPanelStates {
        return {
            
        };
    }



    ///
    /// User interactions
    ///

    private onButtonAdd(){
        this.getActionCreator().addItem({t:'bebebeee'});
    }
    private onButtonDelete(){
        this.getActionCreator().deleteItem(null);
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

		return <div className="ControlPanel">
            {buttons}
        </div>;
	}


}