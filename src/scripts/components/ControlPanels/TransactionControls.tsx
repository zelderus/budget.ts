

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import {TransactionActive, TransactionCmdEvents} from './../ActivePanels/TransactionActive';
import {BaseControls, IBaseControlsProps} from './BaseControls';


export interface ITransactionControlsProps extends IBaseControlsProps {  }
export interface ITransactionControlsStates { isEdit: boolean; }


/**
 * Управление - транзакции.
 */
export class TransactionControls extends BaseControls<ITransactionControlsProps, ITransactionControlsStates> {



    constructor(props: any){
        super(props, [TransactionStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionControlsStates {
        return {
            isEdit: TransactionStore.isShowEditTransactionPanel()

        };
    }



    ///
    /// User interactions
    ///

    private onButtonAdd(){
        this.getActionCreator().editTransactionShow(null);
    }
    private onButtonCancel(){
        this.getActionCreator().editTransactionCancel();
    }
    private onButtonSave(){
        this.sendEventToActivePanel(TransactionCmdEvents.FORM_SAVE);
    }


    private onLogTest(){
        this.getActionCreator().log("test");
    }
    


    ///
    /// Render
    ///

    private drawButtonsForIdle(){
        return <div className="Buttons">
            <div className="Button Success" onClick={e => this.onButtonAdd()}>добавить транзакцию</div>
        </div>
    }

    private drawButtonsForEditWnd(){
        return <div className="Buttons">
            <div className="Button Success" onClick={e => this.onButtonSave()}>сохранить</div>
            <div className="Button Normal" onClick={e => this.onButtonCancel()}>отмена</div>
            <div className="Button Normal" onClick={e => this.onLogTest()}>лог</div>
        </div>
    }


	render() {
        let buttons = this.state.isEdit ? this.drawButtonsForEditWnd() : this.drawButtonsForIdle();

		return <div className="TransactionControls">
            {buttons}
        </div>
	}


}