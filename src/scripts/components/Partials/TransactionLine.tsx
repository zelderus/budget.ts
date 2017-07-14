

import * as React from "react";
import View from './../../flux/View';
//import AppStore from './../../stores/AppStore';

import Transactions from './../../models/Transactions';


export interface ITransactionLineProps { transaction: Transactions.TransactionLine  }
export interface ITransactionLineStates {  }


/**
 * Строка дохода/расхода
 */
export class TransactionLine extends View<ITransactionLineProps, ITransactionLineStates> {

    constructor(props: any){
        super(props, []);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionLineStates {
        return {
            
        };
    }



    ///
    /// User interactions
    ///




    ///
    /// Render
    ///


	render() {

		return <div className="TransactionLine">
            {this.props.transaction.cost}
        </div>;
	}


}





export default TransactionLine;