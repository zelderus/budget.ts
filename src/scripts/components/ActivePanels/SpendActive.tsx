

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';

import Transactions from './../../models/Transactions';
import TransactionLine from './../Partials/TransactionLine';


export interface ISpendActiveProps {  }
export interface ISpendActiveStates {  }


/**
 * Панель - Расходы.
 */
export class SpendActive extends View<ISpendActiveProps, ISpendActiveStates> {

    constructor(props: any){
        super(props, [AppStore]);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ISpendActiveStates {
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