

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';

import Transactions from './../../models/Transactions';
import TransactionLine from './../Partials/TransactionLine';


export interface ITransactionActiveProps {  }
export interface ITransactionActiveStates { transactions: Transactions.TransactionLine[]; isEdit: boolean; editId: string }


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
            transactions: TransactionStore.getTransactions(),
            isEdit: TransactionStore.isShowEditTransactionPanel(),
            editId: TransactionStore.getCurrentEditTransactionId()
        };
    }



    ///
    /// User interactions
    ///

    private _onEditCancel(): void {
        this.getActionCreator().editTransactionCancel();
    }

    private _onEditSave(): void {
        let model = {};
        // TODO: collect data from the form

        this.getActionCreator().editTransactionDo(model);
    }



    ///
    /// Render
    ///

    private renderLines() {
        if (this.state.isEdit) return null;

        let lines = this.state.transactions;
        // sort by Date
        lines = lines.sort((a,b) => a.date > b.date ? -1 : 1);
        // render
        let linesForRender = lines.map(line => { return <TransactionLine transaction={line} /> });
        
        return <div className="LinesPlace">
            {linesForRender}
        </div>
    }


    private renderEditTransaction() {
        if (!this.state.isEdit) return null;
        let transactionId = this.state.editId;

        // TODO: get real Transaction (by transactionId)

        return <div className="TransactionEditWnd">
            <div>ediiiiit '{transactionId}'</div>
            <div className="Button" onClick={e => this._onEditCancel()} >cancel</div>
            <div className="Button" onClick={e => this._onEditSave()}>save</div>
        </div>
    }



	render() {
		return <div className="TransactionActive">
            {this.renderLines()}
            {this.renderEditTransaction()}
        </div>;
	}


}