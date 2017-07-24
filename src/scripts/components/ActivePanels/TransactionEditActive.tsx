

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import {BaseActive, IBaseActiveProps} from './BaseActive';

import Transactions from './../../models/Transactions';
import TransactionLine from './../Partials/TransactionLine';


export interface ITransactionEditActiveProps extends IBaseActiveProps {  }
export interface ITransactionEditActiveStates { 
    editId: string; 
    formModel: Transactions.TransactionEntity;
}



/**
 * События от контрола.
 */
export enum TransactionEditCmdEvents {
    FORM_SAVE = 1
}



/**
 * Панель - редактирование транзакции.
 */
export class TransactionEditActive extends BaseActive<ITransactionEditActiveProps, ITransactionEditActiveStates> {

    __formModel: Transactions.TransactionEntity; // не инициализируем тут модель, т.к. в базовом типе в конструкторе присвоится через getState (иначе, тут обнулится все)

    constructor(props: any){
        super(props, [TransactionStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionEditActiveStates {
        return {
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
        if (transaction != null) this.__formModel = transaction.clone(); // не трогаем реальные данные, работаем с клоном
        else this.__formModel = new Transactions.TransactionEntity();
        return this.__formModel;
    }





    /**
     * Получили событие от управления.
     * @param eventName 
     */
    public onEventFromControls(eventId: number): void {
        let event = eventId as TransactionEditCmdEvents;
        switch(eventId) {
            case TransactionEditCmdEvents.FORM_SAVE:
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


	render() {
		return <div className="TransactionActive">
            <div className="TransactionEditWnd">
                <div>ediiiiit '{this.state.formModel.id}'</div>
                <div>
                    <input name="cost" value={this.state.formModel.cost} onChange={e => this._onFormChangeCost(e)} />
                </div>
                {/*<div className="Button" onClick={e => this._onEditCancel()} >cancel</div>
                <div className="Button" onClick={e => this._onEditSave()}>save</div>*/}
            </div>
        </div>;
	}


}