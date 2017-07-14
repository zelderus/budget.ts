

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';

import Transactions from './../../models/Transactions';
import TransactionLine from './../Partials/TransactionLine';


export interface ITransactionActiveProps {  }
export interface ITransactionActiveStates {  }


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
            
        };
    }



    ///
    /// User interactions
    ///




    ///
    /// Render
    ///

    private renderLines() {

        let lines = [
            new Transactions.TransactionLine('1', new Date(2017, 5, 10), Transactions.TransactionTypes.Spend, "rub", 400),
            new Transactions.TransactionLine('2', new Date(2017, 5, 10), Transactions.TransactionTypes.Spend, "rub", 2400),
            new Transactions.TransactionLine('3', new Date(2017, 5, 11), Transactions.TransactionTypes.Profit, "rub", 50000),
            new Transactions.TransactionLine('4', new Date(2017, 5, 11), Transactions.TransactionTypes.Spend, "rub", 1700),
            new Transactions.TransactionLine('5', new Date(2017, 5, 12), Transactions.TransactionTypes.Spend, "rub", 400),
        ];

        // sort by Date
        lines = lines.sort(line => line.date.getUTCDate());
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