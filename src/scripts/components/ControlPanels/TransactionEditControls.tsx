

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import {TransactionEditActive, TransactionEditCmdEvents} from './../ActivePanels/TransactionEditActive';
import {BaseControls, IBaseControlsProps} from './BaseControls';


export interface ITransactionEditControlsProps extends IBaseControlsProps {  }
export interface ITransactionEditControlsStates {  }


/**
 * Управление - редактор транзакции.
 */
export class TransactionEditControls extends BaseControls<ITransactionEditControlsProps, ITransactionEditControlsStates> {



    constructor(props: any){
        super(props, []);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionEditControlsStates {
        return {

        };
    }



    ///
    /// User interactions
    ///

    private onButtonCancel(){
        this.getActionCreator().navigationBack();
    }
    private onButtonSave(){
        this.sendEventToActivePanel(TransactionEditCmdEvents.FORM_SAVE);
    }


    private onLogTest(){
        this.getActionCreator().log("test");
    }
    


    ///
    /// Render
    ///

	render() {
		return <div className="TransactionControls">
            <div className="Buttons">
                <div className="Button Success" onClick={e => this.onButtonSave()}>сохранить</div>
                <div className="Button Normal" onClick={e => this.onButtonCancel()}>отмена</div>
                <div className="Button Normal" onClick={e => this.onLogTest()}>лог</div>
            </div>
        </div>
	}


}