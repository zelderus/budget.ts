

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
    formModel: Transactions.TransactionEntity;
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

    __formModel: Transactions.TransactionEntity = null;

    constructor(props: any){
        super(props, [TransactionStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionActiveStates {
        return {
            transactions: TransactionStore.getTransactions(),
            isEdit: TransactionStore.isShowEditTransactionPanel(),
            editId: TransactionStore.getCurrentEditTransactionId(),
            formModel: this._getCurrentFormModel()
        };
    }



    //
    //
    //

    // выбранная транзакция для редактирования
    private _getCurrentFormModel(): any {
        let currentTransactionId = TransactionStore.getCurrentEditTransactionId();
        let transaction = TransactionStore.getTransactionById(currentTransactionId);
        if (transaction != null) this.__formModel = transaction;
        else this.__formModel = new Transactions.TransactionEntity();
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


    // сохраняем форму
    private _onEditSave(): void {
        this.getActionCreator().log("Сохранение транзакции..");
        let model = this.__formModel;
        // TODO: клиентская валидация формы
        
        // отправляем
        this.getActionCreator().editTransactionDo(model);
    }





    ///
    /// User interactions
    ///

    private _onFormChangeCost(e: any): void {
        this.__formModel.cost = e.target.value;
        // TODO: check number, sum, etc..

        this.setState({formModel: this.__formModel});
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
            <div>ediiiiit '{this.state.formModel.id}'</div>
            <div>
                <input name="cost" value={this.state.formModel.cost} onChange={e => this._onFormChangeCost(e)} />
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