

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

import Select from './../Partials/Controls/Select';


//export interface ITransactionEditActiveProps extends IBaseActiveProps { }
export interface ICurrencyEditActiveStates { 
    editId: string; 
    formModel: Currencies.CurrencyEntity;
    validator: Currencies.CurrencyFormValidation;
}



/**
 * События от контрола.
 */
export enum CurrencyEditCmdEvents {
    FORM_SAVE       = 1,
}



/**
 * Панель - редактирование счета.
 */
export class CurrencyEditActive extends BaseActive<ICurrencyEditActiveStates> {

    __formModel: Currencies.CurrencyEntity; // не инициализируем тут модель, т.к. в базовом типе в конструкторе присвоится через getState (иначе, тут обнулится все)
    //__withRecalc: boolean;

    constructor(props: any){
        super(props, [CurrencyStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ICurrencyEditActiveStates {
        return {
            editId: CurrencyStore.getCurrentEditCurrencyId(),
            formModel: this._getCurrentFormModel(),
            validator: CurrencyStore.getFormValidator()
        };
    }



    //
    //
    //


    // выбранная транзакция для редактирования
    private _getCurrentFormModel(): any {
        this.__formModel = CurrencyStore.getCurrentEditModel();
        console.log(this.__formModel);
        return this.__formModel;
    }





    /**
     * Получили событие от управления.
     * @param eventName 
     */
    public onEventFromControls(eventId: number): void {
        let event = eventId as CurrencyEditCmdEvents;
        switch(eventId) {
            case CurrencyEditCmdEvents.FORM_SAVE:
                this._onEditSave();
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
        this.getActionCreator().log("Сохранение валюты..");
        let model = this.state.formModel; // this.__formModel;
        // клиентская валидация формы
        if (this._validateForm()) return; // при ошибке, ничего далее не делаем
        // отправляем
        this.getActionCreator().editCurrencyDo(model);
    }



    //
    // Helpers
    //



    ///
    /// User interactions
    ///



    private _onFormChangeTitle(e: any): void {
        this.__formModel.title = e.target.value;
        this._checkAndUpdateState();
    }

    private _onFormChangeShow(e: any): void {
        this.__formModel.show = e.target.value;
        this._checkAndUpdateState();
    }

 



    ///
    /// Render
    ///

    renderTitle() {
        let error = this.state.validator.getError(Currencies.CurrencyFormValidationKeys.Title);
        let errorRender = error==null ? null : <span>({error.message})</span>

        return <div>название {errorRender}
            <input name="title" value={this.state.formModel.title} onChange={e => this._onFormChangeTitle(e)} />
        </div>
    }

    renderShow() {
        let error = this.state.validator.getError(Currencies.CurrencyFormValidationKeys.ShowName);
        let errorRender = error==null ? null : <span>({error.message})</span>

        return <div>строка вывода {errorRender}
            <input name="show" value={this.state.formModel.show} onChange={e => this._onFormChangeShow(e)} />
        </div>
    }







	render() {
        //- редактирование или создание нового
        let isEdit = this.state.editId != null;

		return <div className="CurrencyEditActive">
            {this.renderTitle()}
            {this.renderShow()}
        </div>
	}


}