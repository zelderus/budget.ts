

import * as React from "react";
import View from './../../flux/View';
import Life from './../../Life';
import TransactionStore from './../../stores/TransactionStore';
import AccountStore from './../../stores/AccountStore';
import CurrencyStore from './../../stores/CurrencyStore';
import CategoryStore from './../../stores/CategoryStore';


import {BaseActive, IBaseActiveProps} from './BaseActive';
import Maths from './../../utils/Maths';
import Collections from './../../utils/Collections';

import Accounts from './../../models/Accounts';
import Transactions from './../../models/Transactions';
import Currencies from './../../models/Currencies';
import Categories from './../../models/Categories';
import TransactionLine from './../Partials/TransactionLine';

import Header from './../Partials/Page/Header';
import Col1 from './../Partials/Page/Col1';
import Col2 from './../Partials/Page/Col2';
import Select from './../Partials/Controls/Select';
import Input from './../Partials/Controls/Input';
import Checkbox from './../Partials/Controls/Checkbox';
import JustText from './../Partials/Controls/JustText';
import ButtonIcon from './../Partials/Controls/ButtonIcon';
import {ButtonText, ControlButtonTextStyles} from './../Partials/Controls/ButtonText';

//export interface ITransactionEditActiveProps extends IBaseActiveProps { }
export interface ITransactionEditActiveStates { 
    editId: string; 
    formModel: Transactions.TransactionEntity;
    accounts: Accounts.AccountEntity[];
    currencies: Currencies.CurrencyEntity[];
    categories: Categories.CategoryEntity[];
    validator: Transactions.TransactionFormValidation;
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
        super(props, [TransactionStore, AccountStore, CurrencyStore, CategoryStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionEditActiveStates {
        return {
            editId: TransactionStore.getCurrentEditTransactionId(),
            formModel: this._getCurrentFormModel(),
            accounts: AccountStore.getAccountsSorted(),
            currencies: CurrencyStore.getCurrecies(),
            categories: CategoryStore.getCategories(),
            validator: TransactionStore.getFormValidator(),
            withRecalc: true
        };
    }



    //
    //
    //


    // выбранная транзакция для редактирования
    private _getCurrentFormModel(): Transactions.TransactionEntity {
        this.__formModel = TransactionStore.getCurrentEditTransaction();
        // если новая запись, и еще не выбран счет, то выбираем ему поумолчанию первый счет
        if (this.__formModel.id == null && this.__formModel.accountFromId == null) {
            this.__formModel.accountFromId = AccountStore.getDefaultAccountId();
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
        // проверка валидатором (вариант обновления модели сразу в Сторе, без посылки сообщения через Action)
        this.state.validator.validate(model);
        hasError = this.state.validator.hasError();
        // отправляем сообщение Диспетчеру (НЕ ИСПОЛЬЗУЕТСЯ, обновили модель валидации напрямую)
        //this.getActionCreator().editTransactionValidate(validator);
        return hasError;
    }
    private _checkAndUpdateState(): void {
        this._validateForm(); // ?+ а надо ли на каждом чихе проверять форму???
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
        this.getActionCreator().questionShow("Удалить транзакцию?", () => {
            this.getActionCreator().log("Удаление транзакции..");
            let model = this.state.formModel; //this.__formModel;
            let recalculateAccounts = this.state.withRecalc;
            this.getActionCreator().editTransactionDelete(model, recalculateAccounts);
        });
    }


    //
    // Helpers
    //



    private _onAddAccountLink(): void {
        this.getActionCreator().editAccountShow(null);
    }


    ///
    /// User interactions
    ///

    private _onFormChangeRecalc(e: any): void {
        this.setState({withRecalc: !this.state.withRecalc});
    }

    private _onFormChangeType(transType: Transactions.TransactionTypes): void {
        this.__formModel.type = transType;
        if (transType == Transactions.TransactionTypes.Transfer){ // при выборе Перевод, ставим счет начисления первый попавшийся, но не счет с которого перевод
            //let accountNotFrom = this.state.accounts.filter(f => f.id != this.state.formModel.accountFromId)[0];
            let accountNotFrom = Collections.first(this.state.accounts, (f)=>f.id != this.state.formModel.accountFromId);
            this.__formModel.accountToId = accountNotFrom != null ? accountNotFrom.id : null;
        }
        else {
            this.__formModel.accountToId = null;
        }
        this._checkAndUpdateState();
    }
    private _onFormChangeCost(e: any): void {
        this.__formModel.costStr = e.target.value;
        this.__formModel.cost = Maths.calculateSum(e.target.value);
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
            <div className={"TransactionTypeBtn Spend " + (this.state.formModel.type == Transactions.TransactionTypes.Spend ? "" : "NotActive")} onClick={e => this._onFormChangeType(Transactions.TransactionTypes.Spend)}>Расход</div>
            <div className={"TransactionTypeBtn Profit " + (this.state.formModel.type == Transactions.TransactionTypes.Profit ? "" : "NotActive")} onClick={e => this._onFormChangeType(Transactions.TransactionTypes.Profit)}>Доход</div>
            <div className={"TransactionTypeBtn Transfer " + (this.state.formModel.type == Transactions.TransactionTypes.Transfer ? "" : "NotActive")} onClick={e => this._onFormChangeType(Transactions.TransactionTypes.Transfer)}>Перевод</div>
        </div>
    }

    renderSelectAccountsFrom(isEdit: boolean) {
        if (isEdit) {
            //let currentAccountFrom = this.state.accounts.filter(f => f.id == this.state.formModel.accountFromId)[0];
            let currentAccountFrom = Collections.first(this.state.accounts, (f)=>f.id == this.state.formModel.accountFromId);
            let title = currentAccountFrom != null ? currentAccountFrom.title : "- несуществующий счет -";
            return <div>
                {title}
            </div>
        }
        return <Select 
            name="accountFrom" 
            title="Счет списания"
            currentKey={this.state.formModel.accountFromId}
            list={this.state.accounts}
            objKey="id"
            objText="title"
            //default={ {key:"", text:"- выберите счет -"} }
            onChange={ e=> this._onFormChangeAccountFrom(e) }
            emptyText="нет счетов"
            errorText="- счет отсутствует -"
        />
    }
    renderSelectAccountsTo(isEdit: boolean, accountFrom: Accounts.AccountEntity) {
        if (this.state.formModel.type != Transactions.TransactionTypes.Transfer) return null;//<div>-</div>;
        if (isEdit) {
            //let currentAccountTo = this.state.accounts.filter(f => f.id == this.state.formModel.accountToId)[0];
            let currentAccountTo = Collections.first(this.state.accounts, (f)=>f.id == this.state.formModel.accountToId);
            let title = currentAccountTo != null ? currentAccountTo.title : "- несуществующий счет -";
            return <div>
                {title}
            </div>
        }
        let accountsToList = this.state.accounts.filter(f => f.id != this.state.formModel.accountFromId);
        if (accountFrom != null) accountsToList = accountsToList.filter(f => f.currencyId == accountFrom.currencyId); // берем счета, только с той же валютой
        return <Select 
            name="accountTo" 
            title="Счет зачисления"
            currentKey={this.state.formModel.accountToId}
            list={accountsToList}
            objKey="id"
            objText="title"
            onChange={ e=> this._onFormChangeAccountTo(e) }
            emptyText="нет других счетов с такой валютой"
            errorText="- счет отсутствует -"
        />
    }







	render() {
        //- редактирование или создание нового
        let isEdit = this.state.editId != null;
        //let accountFrom = this.state.accounts.filter(f => f.id == this.state.formModel.accountFromId)[0];
        let accountFrom = Collections.first(this.state.accounts, (f)=>f.id == this.state.formModel.accountFromId);
        let currencyName = CurrencyStore.getCurrencyShowNameByAccount(accountFrom);
        let rowIndex = 0;

        // TODO: на основе модели валидации из Стора (state), подсвечиваем ошибки


		return <div className="TransactionEditActive">
            <Header title="Редактирование транзакции" />
            <div>
                {this.renderType(isEdit)}
            </div>
            <Col1 
                rowIndex={rowIndex++}
                obj1={
                    <Checkbox 
                        name="recalc" 
                        title="Перерасчитать счета" 
                        checked={this.state.withRecalc}
                        onChange={e => this._onFormChangeRecalc(e)} 
                    />
                } 
            />
            <Col2 
                rowIndex={rowIndex++}
                obj1={this.renderSelectAccountsFrom(isEdit)}
                obj2={
                    <span className="link" onClick={e => this._onAddAccountLink()} >+ добавить счет</span>
                }
            />
            <Col2 
                rowIndex={rowIndex++}
                notRender={this.state.formModel.type != Transactions.TransactionTypes.Transfer}
                obj1={this.renderSelectAccountsTo(isEdit, accountFrom)} 
                obj2={ <div></div>}
            />
            <Col2 
                rowIndex={rowIndex++}
                obj1={
                    <input name="costStr" value={this.state.formModel.costStr} onChange={e => this._onFormChangeCost(e)} />
                }
                obj2={
                    <div>= {Life.showMoney(this.state.formModel.cost)} {currencyName}</div>
                }
            />

        </div>
	}


}