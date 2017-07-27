

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import AccountStore from './../../stores/AccountStore';
import {BaseActive, IBaseActiveProps} from './BaseActive';

import Accounts from './../../models/Accounts';
import Transactions from './../../models/Transactions';
import TransactionLine from './../Partials/TransactionLine';

import Select from './../Partials/Controls/Select';


//export interface ITransactionEditActiveProps extends IBaseActiveProps { }
export interface ITransactionEditActiveStates { 
    editId: string; 
    formModel: Transactions.TransactionEntity;
    accounts: Accounts.AccountEntity[];
    withRecalc: boolean;
}



/**
 * События от контрола.
 */
export enum TransactionEditCmdEvents {
    FORM_SAVE       = 1,
    FORM_DELETE     = 2
}



/**
 * Панель - редактирование транзакции.
 */
export class TransactionEditActive extends BaseActive<ITransactionEditActiveStates> {

    __formModel: Transactions.TransactionEntity; // не инициализируем тут модель, т.к. в базовом типе в конструкторе присвоится через getState (иначе, тут обнулится все)
    //__withRecalc: boolean;

    constructor(props: any){
        super(props, [TransactionStore, AccountStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionEditActiveStates {
        return {
            editId: TransactionStore.getCurrentEditTransactionId(),
            formModel: this._getCurrentFormModel(),
            accounts: AccountStore.getAccounts(),
            withRecalc: true
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
            case TransactionEditCmdEvents.FORM_DELETE:
                this._onEditDelete();
                break;
        }
    }





    //
    // Logic
    //

    private _validateForm(): boolean {
        let hasError = false;
        let model = this.__formModel;
        // TODO: 1. check form
        // TODO: 2. if any error - Dispatch about errors - модель валидации в Сторе

        return hasError;
    }
    private _checkAndUpdateState(): void {
        this._validateForm();
        this.setState({formModel: this.__formModel});
    }


    // сохраняем форму
    private _onEditSave(): void {
        this.getActionCreator().log("Сохранение транзакции..");
        let model = this.__formModel;
        let recalculateAccounts = this.state.withRecalc;
        // клиентская валидация формы
        if (this._validateForm()) return; // при ошибке, ничего далее не делаем
        // отправляем
        this.getActionCreator().editTransactionDo(model, recalculateAccounts);
    }

    // удаляем транзакцию
    private _onEditDelete(): void {
        this.getActionCreator().log("Удаление транзакции..");
        let model = this.__formModel;
        let recalculateAccounts = this.state.withRecalc;
        this.getActionCreator().editTransactionDelete(model, recalculateAccounts);
    }

    



    ///
    /// User interactions
    ///

    private _onFormChangeRecalc(e: any): void {
        //this.__withRecalc = !this.__withRecalc;
        //this.setState({withRecalc: this.__withRecalc});
        this.setState({withRecalc: !this.state.withRecalc});
    }

    private _onFormChangeCost(e: any): void {
        this.__formModel.cost = e.target.value;
        this._checkAndUpdateState();
    }

    private _onFormChangeAccountFrom(val: string): void {
        this.__formModel.accountFromId = val;
        this._checkAndUpdateState();
    }
    private _onFormChangeAccountTo(val: string): void {
        this.__formModel.accountToId = val;
        this._checkAndUpdateState();
    }



    ///
    /// Render
    ///

    renderSelectAccountsFrom() {
        return <Select 
            name="accountFrom" 
            currentKey={this.state.formModel.accountFromId}
            list={this.state.accounts.filter(f => f.id != this.state.formModel.accountToId)}
            objKey="id"
            objText="title"
            default={ {key:"", text:"- без счета -"} }
            onChange={ e=> this._onFormChangeAccountFrom(e) }
            emptyText="нет других счетов"
        />
    }
    renderSelectAccountsTo() {
        return <Select 
            name="accountFrom" 
            currentKey={this.state.formModel.accountToId}
            list={this.state.accounts.filter(f => f.id != this.state.formModel.accountFromId)}
            objKey="id"
            objText="title"
            onChange={ e=> this._onFormChangeAccountTo(e) }
            emptyText="нет других счетов"
        />
    }


	render() {
        // TODO: на основе модели валидации из Стора (state), подсвечиваем ошибки

        // TODO: учесть тип выбранной транзакции (если не перевод, скрыть счет зачисления..)

		return <div className="TransactionActive">
            <div className="TransactionEditWnd">
                <div>
                    <span>перерасчитать счета:</span>
                    <input name="recalc" type="checkbox" value="Recalc" checked={this.state.withRecalc} onChange={e => this._onFormChangeRecalc(e)} />
                </div>
                <div>
                    <span>счет списания:</span>
                    {this.renderSelectAccountsFrom()}
                </div>
                <div>
                    <span>счет зачисления:</span>
                    {this.renderSelectAccountsTo()}
                </div>
                <div>
                    <span>сумма:</span>
                    <input name="cost" value={this.state.formModel.cost} onChange={e => this._onFormChangeCost(e)} />
                </div>
            </div>
        </div>;
	}


}