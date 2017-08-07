

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';
import {BaseControls, IBaseControlsProps} from './BaseControls';
import {CurrencyEditActive, CurrencyEditCmdEvents} from './../ActivePanels/CurrencyEditActive';


export interface ICurrencyControlsProps extends IBaseControlsProps {  }
export interface ICurrencyControlsStates { }


/**
 * Управление - вопрос.
 */
export class CurrencyEditControls extends BaseControls<ICurrencyControlsProps, ICurrencyControlsStates> {

    constructor(props: any){
        super(props, []);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ICurrencyControlsStates {
        return {
            
        };
    }



    ///
    /// User interactions
    ///

    private onButtonOk(){
        this.sendEventToActivePanel(CurrencyEditCmdEvents.FORM_SAVE);
    }

    private onButtonCancel(){
        this.getActionCreator().navigationBack();
    }
 


    ///
    /// Render
    ///


	render() {
		return <div className="CurrencyEditControls">
            <div className="Buttons">
                <div className="Button Success" onClick={e => this.onButtonOk()}>сохранить</div>
                <div className="Button Normal" onClick={e => this.onButtonCancel()}>отмена</div>
            </div>
        </div>;
	}


}