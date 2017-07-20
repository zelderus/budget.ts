

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import {BaseActive, IBaseActiveProps} from './BaseActive';

import Transactions from './../../models/Transactions';
import TransactionLine from './../Partials/TransactionLine';


export interface ITransactionActiveProps extends IBaseActiveProps {  }
export interface ITransactionActiveStates { 
    transactions: Transactions.TransactionLine[]; 
    isEdit: boolean; 
    editId: string; 

    formId: string;
    formTitle: string;
}



/**
 * События от контрола.
 */
export enum TransactionCmdEvents {
    FORM_SAVE = 1
}



/**
 * Панель - транзакции.
 */
export class TransactionActive extends BaseActive<ITransactionActiveProps, ITransactionActiveStates> {

    __formModel: any = null; // TODO: to type !!!

    constructor(props: any){
        super(props, [TransactionStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionActiveStates {

        // модель транзакции
        let formModel: any = this._getCurrentFormModel();


        return {
            transactions: TransactionStore.getTransactions(),
            isEdit: TransactionStore.isShowEditTransactionPanel(),
            editId: TransactionStore.getCurrentEditTransactionId(),

            formId: formModel.id,
            formTitle: formModel.title
        };
    }



    //
    //
    //

    private _getCurrentFormModel(): any {
        //if (this.__formModel != null) return this.__formModel;

        let currentTransactionId = TransactionStore.getCurrentEditTransactionId();
        this.__formModel = {};
        let transaction = TransactionStore.getTransactionById(currentTransactionId);
        if (transaction != null) {
            this.__formModel.id = transaction.id;
            this.__formModel.title = transaction.cost;

        }
        
        return this.__formModel;
    }





    /**
     * Получили событие от управления.
     * @param eventName 
     */
    public onEventFromControls(eventId: number): void {
        let event = eventId as TransactionCmdEvents;
        switch(eventId) {
            case TransactionCmdEvents.FORM_SAVE:
                this._onEditSave();
                break;

        }
    }





    //
    // Logic
    //

    private _onEditSave(): void {
        this.getActionCreator().log("Сохранение транзакции..");
        let model = this.__formModel;
        this.getActionCreator().editTransactionDo(model);
    }





    ///
    /// User interactions
    ///

    private _onFormChangeTitle(e: any): void {
        this.setState({formTitle: e.target.value});
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

        return <div className="TransactionEditWnd">
            <div>ediiiiit '{this.state.formId}'</div>
            <div>
                <input name="title" value={this.state.formTitle} onChange={e => this._onFormChangeTitle(e)} />
            </div>
            {/*<div className="Button" onClick={e => this._onEditCancel()} >cancel</div>
            <div className="Button" onClick={e => this._onEditSave()}>save</div>*/}
        </div>
    }



	render() {
		return <div className="TransactionActive">
            {this.renderLines()}
            {this.renderEditTransaction()}
        </div>;
	}


}