

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import AccountStore from './../../stores/AccountStore';
import CurrencyStore from './../../stores/CurrencyStore';
import {BaseActive, IBaseActiveProps} from './BaseActive';

import Accounts from './../../models/Accounts';
import AccountLine from './../Partials/AccountLine';




//export interface IAccountActiveProps extends IBaseActiveProps {  }
export interface IAccountActiveStates { accounts: Accounts.AccountEntity[]; }


/**
 * Панель - счета.
 */
export class AccountActive extends BaseActive<IAccountActiveStates> {

    constructor(props: any){
        super(props, [AccountStore]);

    }



    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IAccountActiveStates {
        return {
            accounts: AccountStore.getAccounts()
        };
    }



    ///
    /// User interactions
    ///




    ///
    /// Render
    ///

    private renderAccountLines() {

        let lines = this.state.accounts;
        // sort
        lines = lines.sort((a,b) => a.order < b.order ? -1 : 1);
        //
        let lastCurrencyShow: string = "";
        //
        let linesForRender = lines.map(account => { 
            // достаем связанные данные (каждая линия с данными будет автономная, без прослушки чего-либо - это окно все равно обновится, если что)
            lastCurrencyShow = CurrencyStore.getCurrencyShowNameByAccount(account);

            // render
            return <AccountLine account={account} currencyShow={lastCurrencyShow} /> 
        });
        
        return <div className="LinesPlace">
            {linesForRender}
        </div>
    }



	render(){

		return <div className="AccountActive">
            {this.renderAccountLines()}
        </div>;
	}


}