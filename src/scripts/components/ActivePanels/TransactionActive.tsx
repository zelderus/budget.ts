

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';

import Transactions from './../../models/Transactions';
import TransactionLine from './../Partials/TransactionLine';


export interface ITransactionActiveProps {  }
export interface ITransactionActiveStates { transactions: Transactions.TransactionLine[]; }


/**
 * Панель - транзакции.
 */
export class TransactionActive extends View<ITransactionActiveProps, ITransactionActiveStates> {

    constructor(props: any){
        super(props, [TransactionStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionActiveStates {
        return {
            transactions: TransactionStore.getTransactions()
        };
    }



    ///
    /// User interactions
    ///




    ///
    /// Render
    ///

    private renderLines() {

        let lines = this.state.transactions;
        // sort by Date
        lines = lines.sort((a,b) => a.date > b.date ? -1 : 1);
        // render
        let linesForRender = lines.map(line => { return <TransactionLine transaction={line} /> });
        
        return <div className="LinesPlace">
            {linesForRender}
        </div>
    }


	render() {

		return <div className="TransactionActive">
            {this.renderLines()}
        </div>;
	}


}