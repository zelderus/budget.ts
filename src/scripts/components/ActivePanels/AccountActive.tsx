

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';

import Accounts from './../../models/Accounts';
import AccountLine from './../Partials/AccountLine';



export interface IAccountActiveProps {  }
export interface IAccountActiveStates { accounts: Accounts.AccountLine[]; }


/**
 * Панель - счета.
 */
export class AccountActive extends View<IAccountActiveProps, IAccountActiveStates> {

    constructor(props: any){
        super(props, [TransactionStore]);

    }

    componentDidMount () {
        super.componentDidMount();
        this.getActionCreator().loadAccounts();
    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IAccountActiveStates {
        return {
            accounts: TransactionStore.getAccounts()
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