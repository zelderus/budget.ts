

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
        else {
            let accounts = AccountStore.getAccounts();
            this.__formModel = new Transactions.TransactionEntity();
            this.__formModel.accountFromId = accounts.length > 0 ? accounts[0].id : null;
            this.__formModel.accountToId = null;
            this.__formModel.type = Transactions.TransactionTypes.Spend;
            this.__formModel.comment = "";
        }
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
        let model = this.state.formModel; //this.__formModel;
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
        let model = this.state.formModel; // this.__formModel;
        let recalculateAccounts = this.state.withRecalc;
        // клиентская валидация формы
        if (this._validateForm()) return; // при ошибке, ничего далее не делаем
        // отправляем
        this.getActionCreator().editTransactionDo(model, recalculateAccounts);
    }

    // удаляем транзакцию
    private _onEditDelete(): void {
        this.getActionCreator().log("Удаление транзакции..");
        let model = this.state.formModel; //this.__formModel;
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
    private _onFormChangeType(transType: Transactions.TransactionTypes): void {
        this.__formModel.type = transType;
        this._checkAndUpdateState();
    }


    ///
    /// Render
    ///

    renderType(isEdit: boolean) {
        if (isEdit) {
            let btnStyles = "TransactionType ";
            let btnTitle = "Расход";
            switch(this.state.formModel.type){
                case Transactions.TransactionTypes.Spend: btnTitle = "Расход"; btnStyles += "Spend"; break;
                case Transactions.TransactionTypes.Profit: btnTitle = "Доход"; btnStyles += "Profit"; break;
                case Transactions.TransactionTypes.Transfer: btnTitle = "Перевод"; btnStyles += "Transfer"; break;
            }
            return <div className={btnStyles}>{btnTitle}</div>
        }
        return <div>
            <div className={"TransactionTypeBtn Spend " + (this.state.formModel.type == Transactions.TransactionTypes.Spend ? "Active" : "")} onClick={e => this._onFormChangeType(Transactions.TransactionTypes.Spend)}>Расход</div>
            <div className={"TransactionTypeBtn Profit " + (this.state.formModel.type == Transactions.TransactionTypes.Profit ? "Active" : "")} onClick={e => this._onFormChangeType(Transactions.TransactionTypes.Profit)}>Доход</div>
            <div className={"TransactionTypeBtn Transfer " + (this.state.formModel.type == Transactions.TransactionTypes.Transfer ? "Active" : "")} onClick={e => this._onFormChangeType(Transactions.TransactionTypes.Transfer)}>Перевод</div>
        </div>
    }

    renderSelectAccountsFrom(isEdit: boolean) {
        if (isEdit) {
            let currentAccountFrom = this.state.accounts.filter(f => f.id == this.state.formModel.accountFromId)[0];
            let title = currentAccountFrom != null ? currentAccountFrom.title : "- несуществующий счет -";
            return <div>
                {title}
            </div>
        }
        return <Select 
            name="accountFrom" 
            currentKey={this.state.formModel.accountFromId}
            list={this.state.accounts.filter(f => f.id != this.state.formModel.accountToId)}
            objKey="id"
            objText="title"
            //default={ {key:"", text:"- без счета -"} }
            onChange={ e=> this._onFormChangeAccountFrom(e) }
            emptyText="нет счетов"
        />
    }
    renderSelectAccountsTo(isEdit: boolean) {
        if (this.state.formModel.type != Transactions.TransactionTypes.Transfer) return null;
        if (isEdit) {
            let currentAccountTo = this.state.accounts.filter(f => f.id == this.state.formModel.accountToId)[0];
            let title = currentAccountTo != null ? currentAccountTo.title : "- несуществующий счет -";
            return <div>
                {title}
            </div>
        }
        let accountsToList = this.state.accounts.filter(f => f.id != this.state.formModel.accountFromId);
        if (accountsToList.length <= 1) accountsToList = []; // если только один счет в наличии, то значит с него пытаемся перевести (на самого себя не можем, удаляем его из списка)
        return <Select 
            name="accountFrom" 
            currentKey={this.state.formModel.accountToId}
            list={accountsToList}
            objKey="id"
            objText="title"
            onChange={ e=> this._onFormChangeAccountTo(e) }
            emptyText="нет других счетов"
        />
    }


	render() {
        //- редактирование или создание нового
        let isEdit = this.state.editId != null;


        // TODO: на основе модели валидации из Стора (state), подсвечиваем ошибки

        // TODO: учесть тип выбранной транзакции (если не перевод, скрыть счет зачисления..)

		return <div className="TransactionEditActive">
            <div>
                {this.renderType(isEdit)}
            </div>
            <div>
                <span>перерасчитать счета:</span>
                <input name="recalc" type="checkbox" value="Recalc" checked={this.state.withRecalc} onChange={e => this._onFormChangeRecalc(e)} />
            </div>
            <div>
                <span>счет списания:</span>
                {this.renderSelectAccountsFrom(isEdit)}
            </div>
            <div>
                <span>счет зачисления:</span>
                {this.renderSelectAccountsTo(isEdit)}
            </div>
            <div>
                <span>сумма:</span>
                <input name="cost" value={this.state.formModel.cost} onChange={e => this._onFormChangeCost(e)} />
            </div>
        </div>
	}


}