

import * as React from "react";
import View from './../../flux/View';
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
            currencies: CurrencyStore.getCurreciesSorted(),
            validator: AccountStore.getFormValidator()
        };
    }



    //
    //
    //


    // выбранная транзакция для редактирования
    private _getCurrentFormModel(): any {
        this.__formModel = AccountStore.getCurrentEditAccount();
        // если новый счет, и не выбрана валюта, то выбираем поумолчанию
        if (this.__formModel.id == null && this.__formModel.currencyId == null) {
            this.__formModel.currencyId = CurrencyStore.getDefaultCurrencyId();
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
        this.getActionCreator().questionShow("Удалить счет?", () => {
            this.getActionCreator().log("Удаление счета..");
            let model = this.state.formModel; //this.__formModel;
            this.getActionCreator().editAccountDelete(model);
        });
    }


    //
    // Helpers
    //


    private _onEditCurrencyLinkLink(): void {
        this.getActionCreator().editCurrencyShow(this.state.formModel.currencyId);
    }
    private _onAddCurrencyLinkLink(): void {
        this.getActionCreator().editCurrencyShow(null);
    }


    ///
    /// User interactions
    ///

    private _onFormChangeCurrency(val: string): void {
        this.__formModel.currencyId = val;
        this._checkAndUpdateState();
    }

    private _onFormChangeTitle(v: any): void {
        this.__formModel.title = v; //e.target.value;
        this._checkAndUpdateState();
    }

    private _onFormChangeSumm(e: any): void {
        this.__formModel.sum = Maths.calculateSum(e); //.target.value);
        this._checkAndUpdateState();
    }

    private _onFormChangeLimit(e: any): void {
        this.__formModel.creditLimit = Maths.calculateSum(e); //.target.value);
        this._checkAndUpdateState();
    }

    private _onFormChangeIsCredit(e: any): void {
        this.__formModel.isCredit = !this.__formModel.isCredit;
        this._checkAndUpdateState();
    }

    private _onFormChangeIsDefault(e: any): void {
        this.__formModel.isDefault = !this.__formModel.isDefault;
        this._checkAndUpdateState();
    }
 



    ///
    /// Render
    ///


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







	render() {
        //- редактирование или создание нового
        let isEdit = this.state.editId != null;
        let currencyName = CurrencyStore.getCurrencyShowNameByAccount(this.state.formModel);

        // TODO: на основе модели валидации из Стора (state), подсвечиваем ошибки


		return <div className="AccountEditActive">
            <Header title="Редактирование счета" />
            <div>icon</div>
            <Col1 
                obj1={
                    <Input 
                        name="title" 
                        title="Название" 
                        value={this.state.formModel.title} 
                        onChange={e => this._onFormChangeTitle(e)} 
                        error={this.state.validator.getError(Accounts.AccountFormValidationKeys.Title)} 
                    />
                } 
            />
            <div>валюта
                {this.renderSelectCurrencies(isEdit)}
                <span className="link" onClick={e => this._onEditCurrencyLinkLink()} >редактировать валюту</span>
                <span className="link" onClick={e => this._onAddCurrencyLinkLink()} >+ добавить валюту</span>
            </div>
            <div>кредитная карта
                <input name="iscredit" type="checkbox" checked={this.state.formModel.isCredit} onChange={e => this._onFormChangeIsCredit(e)} />
            </div>

            <Col2 
                obj1={
                    <Input 
                        name="summ" 
                        title="Начальная сумма" 
                        value={this.state.formModel.sum} 
                        onChange={e => this._onFormChangeSumm(e)} 
                        error={this.state.validator.getError(Accounts.AccountFormValidationKeys.Sum)} 
                    />
                }
                obj2={
                    <span>{currencyName}</span>
                } 
            />
            <Col2 
                notRender={!this.state.formModel.isCredit}
                obj1={
                    <Input 
                        name="debt" 
                        title="Лимит кредитки" 
                        value={this.state.formModel.creditLimit} 
                        onChange={e => this._onFormChangeLimit(e)} 
                        error={this.state.validator.getError(Accounts.AccountFormValidationKeys.CreditLimit)} 
                    />
                }
                obj2={
                    <span>{currencyName}</span>
                } 
            />

            <div>по умолчанию
                <input name="isdefault" type="checkbox" checked={this.state.formModel.isDefault} onChange={e => this._onFormChangeIsDefault(e)} />
            </div>
        </div>
	}


}