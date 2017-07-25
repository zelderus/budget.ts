

import * as React from "react";
import View from './../../flux/View';
//import AppStore from './../../stores/AppStore';

import Transactions from './../../models/Transactions';


export interface ITransactionLineProps { transaction: Transactions.TransactionEntity  }
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

    private onItemEditClick(id: string) {
        this.getActionCreator().editTransactionShow(id);
    }





    ///
    /// Render
    ///


	render() {
        let transTypeClass = "";
        switch (this.props.transaction.type) {
            case Transactions.TransactionTypes.Profit: transTypeClass = "Profit"; break;
            case Transactions.TransactionTypes.Spend: transTypeClass = "Spend"; break;
            case Transactions.TransactionTypes.Transfer: transTypeClass = "Transfer"; break;
        }

        // TODO: тянем связанные данные
        let currency = "rub";


		return <div className="TransactionLine">
            <span className="Date">{this.numTo2Zero(this.props.transaction.date.getDate())}.{this.numTo2Zero(this.props.transaction.date.getMonth())}.{this.props.transaction.date.getFullYear()}</span>
            {/*<span className="Time">({this.numTo2Zero(this.props.transaction.date.getHours())}:{this.numTo2Zero(this.props.transaction.date.getMinutes())})</span>*/}
            <span className={"Cost " + transTypeClass}>
                <span className="Value">{this.props.transaction.cost == null ? 0 : this.props.transaction.cost}</span><span className="Currency">{currency}</span>
            </span>
            {/*<span className="Title">{this.props.transaction.id}</span>*/}
            <span className="Button Edit" onClick={e => this.onItemEditClick(this.props.transaction.id)} >EDIT</span>
        </div>;
	}


}





export default TransactionLine;