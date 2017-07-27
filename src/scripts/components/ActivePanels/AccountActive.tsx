

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import AccountStore from './../../stores/AccountStore';
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
        // render
        let linesForRender = lines.map(line => { return <AccountLine account={line} /> });
        
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