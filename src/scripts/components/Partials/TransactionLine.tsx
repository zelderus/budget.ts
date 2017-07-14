

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

    private numberFormat(num: number, slices: number): string {
        return ("0" + num).slice(-slices);
    }
    private numTo2Zero(num: number): string {
        return this.numberFormat(num, 2);
    }

    ///
    /// User interactions
    ///



    ///
    /// Render
    ///


	render() {

		return <div className="TransactionLine">
            <span className="Date">{this.numTo2Zero(this.props.transaction.date.getDate())}.{this.numTo2Zero(this.props.transaction.date.getMonth())}.{this.props.transaction.date.getFullYear()}</span>
            <span className="Time">({this.numTo2Zero(this.props.transaction.date.getHours())}:{this.numTo2Zero(this.props.transaction.date.getMinutes())})</span>
            <span className="Title">{this.props.transaction.cost}</span>
        </div>;
	}


}





export default TransactionLine;