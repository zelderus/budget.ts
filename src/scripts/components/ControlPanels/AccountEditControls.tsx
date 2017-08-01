

import * as React from "react";
import View from './../../flux/View';
import AccountStore from './../../stores/AccountStore';
import {AccountEditActive, AccountEditCmdEvents} from './../ActivePanels/AccountEditActive';
import {BaseControls, IBaseControlsProps} from './BaseControls';


export interface IAccountEditControlsProps extends IBaseControlsProps {  }
export interface IAccountEditControlsStates { editId: string;  }


/**
 * Управление - редактор счета.
 */
export class AccountEditControls extends BaseControls<IAccountEditControlsProps, IAccountEditControlsStates> {



    constructor(props: any){
        super(props, [AccountStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IAccountEditControlsStates {
        return {
            editId: AccountStore.getCurrentEditAccountId(),
        };
    }



    ///
    /// User interactions
    ///

    private onButtonCancel(){
        this.getActionCreator().navigationBack();
    }
    private onButtonSave(){
        this.sendEventToActivePanel(AccountEditCmdEvents.FORM_SAVE);
    }
    private onButtonDelete(){
        this.sendEventToActivePanel(AccountEditCmdEvents.FORM_DELETE);
    }

    


    ///
    /// Render
    ///

	render() {
        let isNewItem = this.state.editId == null || this.state.editId === '';

        let deleteButtonRender = isNewItem ? null : <div className="Button Alert" onClick={e => this.onButtonDelete()}>удалить</div>;

		return <div className="TransactionControls">
            <div className="Buttons">
                <div className="Button Success" onClick={e => this.onButtonSave()}>сохранить</div>
                <div className="Button Normal" onClick={e => this.onButtonCancel()}>отмена</div>
                {deleteButtonRender}
            </div>
        </div>
	}


}