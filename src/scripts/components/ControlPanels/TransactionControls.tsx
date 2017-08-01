

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import {TransactionActive} from './../ActivePanels/TransactionActive';
import {BaseControls, IBaseControlsProps} from './BaseControls';


export interface ITransactionControlsProps extends IBaseControlsProps {  }
export interface ITransactionControlsStates {  }


/**
 * Управление - транзакции.
 */
export class TransactionControls extends BaseControls<ITransactionControlsProps, ITransactionControlsStates> {



    constructor(props: any){
        super(props, []);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionControlsStates {
        return {

        };
    }



    ///
    /// User interactions
    ///

    private onButtonAdd(){
        this.getActionCreator().editTransactionShow(null);
    }
    


    ///
    /// Render
    ///

	render() {
		return <div className="TransactionControls">
            <div className="Buttons">
                <div className="Button Success" onClick={e => this.onButtonAdd()}>добавить транзакцию</div>
            </div>
        </div>
	}


}