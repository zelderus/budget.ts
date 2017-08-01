

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import AccountStore from './../../stores/AccountStore';
import CurrencyStore from './../../stores/CurrencyStore';
import CategoryStore from './../../stores/CategoryStore';

import {BaseActive, IBaseActiveProps} from './BaseActive';
import Maths from './../../utils/Maths';

import Accounts from './../../models/Accounts';
import Transactions from './../../models/Transactions';
import Currencies from './../../models/Currencies';
import Categories from './../../models/Categories';
import TransactionLine from './../Partials/TransactionLine';

import Select from './../Partials/Controls/Select';


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
            accounts: AccountStore.getAccounts(),
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
    private _getCurrentFormModel(): any {
        let currentTransactionId = TransactionStore.getCurrentEditTransactionId();
        let transaction = TransactionStore.getTransactionById(currentTransactionId);
        if (transaction != null) {
            this.__formModel = transaction.clone(); // не трогаем реальные данные, работаем с клоном
            this.__formModel.costStr = this.__formModel.cost.toString();
        }
        else {
            let accounts = AccountStore.getAccounts();

            this.__formModel = new Transactions.TransactionEntity();
            this.__formModel.accountFromId = accounts.length > 0 ? accounts[0].id : null;
            this.__formModel.accountToId = null;
            this.__formModel.type = Transactions.TransactionTypes.Spend;
            this.__formModel.comment = "";
            this.__formModel.costStr = "";
            this.__formModel.cost = 0;
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
        this.getActionCreator().log("Удаление транзакции..");
        let model = this.state.formModel; //this.__formModel;
        let recalculateAccounts = this.state.withRecalc;
        this.getActionCreator().editTransactionDelete(model, recalculateAccounts);
    }


    //
    // Helpers
    //






    ///
    /// User interactions
    ///

    private _onFormChangeRecalc(e: any): void {
        this.setState({withRecalc: !this.state.withRecalc});
    }

    private _onFormChangeType(transType: Transactions.TransactionTypes): void {
        this.__formModel.type = transType;
        if (transType == Transactions.TransactionTypes.Transfer){ // при выборе Перевод, ставим счет начисления первый попавшийся, но не счет с которого перевод
            let accountNotFrom = this.state.accounts.filter(f => f.id != this.state.formModel.accountFromId)[0];
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
            let currentAccountFrom = this.state.accounts.filter(f => f.id == this.state.formModel.accountFromId)[0];
            let title = currentAccountFrom != null ? currentAccountFrom.title : "- несуществующий счет -";
            return <div>
                {title}
            </div>
        }
        return <Select 
            name="accountFrom" 
            currentKey={this.state.formModel.accountFromId}
            list={this.state.accounts}
            objKey="id"
            objText="title"
            //default={ {key:"", text:"- без счета -"} }
            onChange={ e=> this._onFormChangeAccountFrom(e) }
            emptyText="нет счетов"
        />
    }
    renderSelectAccountsTo(isEdit: boolean, accountFrom: Accounts.AccountEntity) {
        if (this.state.formModel.type != Transactions.TransactionTypes.Transfer) return <div>-</div>;
        if (isEdit) {
            let currentAccountTo = this.state.accounts.filter(f => f.id == this.state.formModel.accountToId)[0];
            let title = currentAccountTo != null ? currentAccountTo.title : "- несуществующий счет -";
            return <div>
                {title}
            </div>
        }
        let accountsToList = this.state.accounts.filter(f => f.id != this.state.formModel.accountFromId);
        if (accountFrom != null) accountsToList = accountsToList.filter(f => f.currencyId == accountFrom.currencyId); // берем счета, только с той же валютой
        return <Select 
            name="accountTo" 
            currentKey={this.state.formModel.accountToId}
            list={accountsToList}
            objKey="id"
            objText="title"
            onChange={ e=> this._onFormChangeAccountTo(e) }
            emptyText="нет других счетов с такой валютой"
        />
    }







	render() {
        //- редактирование или создание нового
        let isEdit = this.state.editId != null;
        let accountFrom = this.state.accounts.filter(f => f.id == this.state.formModel.accountFromId)[0];
        let currencyName = CurrencyStore.getCurrencyShowNameByAccount(accountFrom);

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
                {this.renderSelectAccountsTo(isEdit, accountFrom)}
            </div>
            <div>
                <span>сумма:</span>
                <input name="costStr" value={this.state.formModel.costStr} onChange={e => this._onFormChangeCost(e)} />
                <div>= {this.state.formModel.cost} {currencyName}</div>
            </div>
        </div>
	}


}