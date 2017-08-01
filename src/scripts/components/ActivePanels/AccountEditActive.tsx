

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
export interface IAccountEditActiveStates { 
    editId: string; 
    formModel: Accounts.AccountEntity;
    currencies: Currencies.CurrencyEntity[];
    validator: Accounts.AccountFormValidation;
}



/**
 * События от контрола.
 */
export enum AccountEditCmdEvents {
    FORM_SAVE       = 1,
    FORM_DELETE     = 2
}



/**
 * Панель - редактирование счета.
 */
export class AccountEditActive extends BaseActive<IAccountEditActiveStates> {

    __formModel: Accounts.AccountEntity; // не инициализируем тут модель, т.к. в базовом типе в конструкторе присвоится через getState (иначе, тут обнулится все)
    //__withRecalc: boolean;

    constructor(props: any){
        super(props, [TransactionStore, AccountStore, CurrencyStore, CategoryStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IAccountEditActiveStates {
        return {
            editId: AccountStore.getCurrentEditAccountId(),
            formModel: this._getCurrentFormModel(),
            currencies: CurrencyStore.getCurrecies(),
            validator: AccountStore.getFormValidator()
        };
    }



    //
    //
    //


    // выбранная транзакция для редактирования
    private _getCurrentFormModel(): any {
        let currentAccountId = AccountStore.getCurrentEditAccountId();
        let account = AccountStore.getAccountById(currentAccountId);
        if (account != null) {
            this.__formModel = account.clone(); // не трогаем реальные данные, работаем с клоном
        }
        else {
            let currencies = CurrencyStore.getCurrecies();

            this.__formModel = new Accounts.AccountEntity();
            this.__formModel.sum = 0;
            this.__formModel.currencyId = currencies.length > 0 ? currencies[0].id : null;
            this.__formModel.isCredit = false;
            this.__formModel.creditLimit = 0;
            this.__formModel.order = AccountStore.getNextAccountOrder();
        }
        return this.__formModel;
    }





    /**
     * Получили событие от управления.
     * @param eventName 
     */
    public onEventFromControls(eventId: number): void {
        let event = eventId as AccountEditCmdEvents;
        switch(eventId) {
            case AccountEditCmdEvents.FORM_SAVE:
                this._onEditSave();
                break;
            case AccountEditCmdEvents.FORM_DELETE:
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
        //this.getActionCreator().editAccountValidate(validator);
        return hasError;
    }
    private _checkAndUpdateState(): void {
        this._validateForm(); // ?+ а надо ли на каждом чихе проверять форму???
        this.setState({formModel: this.__formModel});
    }


    // сохраняем форму
    private _onEditSave(): void {
        this.getActionCreator().log("Сохранение счета..");
        let model = this.state.formModel; // this.__formModel;
        // клиентская валидация формы
        if (this._validateForm()) return; // при ошибке, ничего далее не делаем
        // отправляем
        this.getActionCreator().editAccountDo(model);
    }

    // удаляем транзакцию
    private _onEditDelete(): void {
        this.getActionCreator().log("Удаление счета..");
        let model = this.state.formModel; //this.__formModel;
        this.getActionCreator().editAccountDelete(model);
    }


    //
    // Helpers
    //






    ///
    /// User interactions
    ///

    private _onFormChangeCurrency(val: string): void {
        this.__formModel.currencyId = val;
        this._checkAndUpdateState();
    }

    private _onFormChangeTitle(e: any): void {
        this.__formModel.title = e.target.value;
        this._checkAndUpdateState();
    }

    private _onFormChangeSumm(e: any): void {
        this.__formModel.sum = Maths.calculateSum(e.target.value);
        this._checkAndUpdateState();
    }

    private _onFormChangeLimit(e: any): void {
        this.__formModel.creditLimit = Maths.calculateSum(e.target.value);
        this._checkAndUpdateState();
    }

    private _onFormChangeIsCredit(e: any): void {
        this.__formModel.isCredit = !this.__formModel.isCredit;
        this._checkAndUpdateState();
    }
 



    ///
    /// Render
    ///

    renderTitle() {
        let error = this.state.validator.getError(Accounts.AccountFormValidationKeys.Title);
        let errorRender = error==null ? null : <span>({error.message})</span>

        return <div>название {errorRender}
            <input name="title" value={this.state.formModel.title} onChange={e => this._onFormChangeTitle(e)} />
        </div>
    }

    renderSelectCurrencies(isEdit: boolean) {
        if (isEdit) {
            let currency = this.state.currencies.filter(f => f.id == this.state.formModel.currencyId)[0];
            let title = currency != null ? currency.title : "- несуществующая валюта -";
            return <span>
                {title}
            </span>
        }
        let error = this.state.validator.getError(Accounts.AccountFormValidationKeys.Currency);
        // TODO: подсветка ошибки в Select
        return <Select 
            name="currency" 
            currentKey={this.state.formModel.currencyId}
            list={this.state.currencies}
            objKey="id"
            objText="title"
            //default={ {key:"", text:"- без счета -"} }
            onChange={ e=> this._onFormChangeCurrency(e) }
            emptyText="нет валют"
        />
    }


    renderCreditLimit(currencyName: string) {
        if (!this.state.formModel.isCredit) return null;
        return <div>лимит кредитки
            <input name="debt" value={this.state.formModel.creditLimit} onChange={e => this._onFormChangeLimit(e)} />
            <span>{currencyName}</span>
        </div>
    }







	render() {
        //- редактирование или создание нового
        let isEdit = this.state.editId != null;
        let currencyName = CurrencyStore.getCurrencyShowNameByAccount(this.state.formModel);

        // TODO: на основе модели валидации из Стора (state), подсвечиваем ошибки


		return <div className="AccountEditActive">
            <div>icon</div>
            {this.renderTitle()}
            <div>валюта
                {this.renderSelectCurrencies(isEdit)}
                <div>переход редактирование валют</div>
            </div>
            <div>кредитная карта
                <input name="iscredit" type="checkbox" checked={this.state.formModel.isCredit} onChange={e => this._onFormChangeIsCredit(e)} />
            </div>
            <div>начальная сумма
                <input name="summ" value={this.state.formModel.sum} onChange={e => this._onFormChangeSumm(e)} />
                <span>{currencyName}</span>
            </div>
            {this.renderCreditLimit(currencyName)}
        </div>
	}


}