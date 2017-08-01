

import * as React from "react";
import View from './../../flux/View';
import CurrencyStore from './../../stores/CurrencyStore';
import AccountStore from './../../stores/AccountStore';
import TransactionStore from './../../stores/TransactionStore';
import {BaseActive, IBaseActiveProps} from './BaseActive';

import Accounts from './../../models/Accounts';
import Transactions from './../../models/Transactions';
import TransactionLine from './../Partials/TransactionLine';


//export interface ITransactionActiveProps extends IBaseActiveProps {  }
export interface ITransactionActiveStates { 
    transactions: Transactions.TransactionEntity[]; 
    accounts: Accounts.AccountEntity[];
}





/**
 * Панель - транзакции.
 */
export class TransactionActive extends BaseActive<ITransactionActiveStates> {


    constructor(props: any){
        super(props, [TransactionStore, CurrencyStore, AccountStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ITransactionActiveStates {
        return {
            transactions: TransactionStore.getTransactions(),
            accounts: AccountStore.getAccounts()
        };
    }




    ///
    /// User interactions
    ///




    ///
    /// Render
    ///

    private renderLines() {
        let lines = this.state.transactions;
        // sort by Date
        lines = lines.sort((a,b) => a.date > b.date ? -1 : 1);
        // 
        let lastAccountFrom: Accounts.AccountEntity = null;
        let lastAccountTo: Accounts.AccountEntity = null;
        let lastCurrencyShow: string = "";
        // 
        let linesForRender = lines.map(transaction => { 
            // достаем связанные данные (каждая линия с данными будет автономная, без прослушки чего-либо - это окно все равно обновится, если что)
            if (lastAccountFrom == null || lastAccountFrom.id != transaction.accountFromId) {
                lastAccountFrom = this.state.accounts.filter(f => f.id == transaction.accountFromId)[0];
                lastCurrencyShow = CurrencyStore.getCurrencyShowNameByAccount(lastAccountFrom);
            }
            if (transaction.accountToId != null && (lastAccountTo == null || lastAccountTo.id != transaction.accountToId)) {
                lastAccountTo = this.state.accounts.filter(f => f.id == transaction.accountToId)[0];
            }
            // render
            return <TransactionLine transaction={transaction} accountFrom={lastAccountFrom} accountTo={lastAccountTo} currencyShow={lastCurrencyShow} /> 
        });
        
        return <div className="LinesPlace">
            {linesForRender}
        </div>
    }





	render() {
		return <div className="TransactionActive">
            {this.renderLines()}
        </div>;
	}


}