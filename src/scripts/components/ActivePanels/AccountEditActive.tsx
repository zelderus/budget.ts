

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
            currencies: CurrencyStore.getCurrecies()
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

            this.__formModel = new Accounts.AccountEntity();
            this.__formModel.sum = 0;
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

 



    ///
    /// Render
    ///




	render() {
        //- редактирование или создание нового
        let isEdit = this.state.editId != null;
        //let currencyName = CurrencyStore.getCurrencyShowNameByAccount(accountFrom);

        // TODO: на основе модели валидации из Стора (state), подсвечиваем ошибки


		return <div className="AccountEditActive">
            <div>
                account edit...
            </div>
        </div>
	}


}