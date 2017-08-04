

import * as React from "react";
import View from './../../flux/View';
//import AppStore from './../../stores/AppStore';

import Accounts from './../../models/Accounts';


export interface IAccountLineProps { 
    account: Accounts.AccountEntity;
    currencyShow: string;
}
export interface IAccountLineStates {  }


/**
 * Строка счета
 */
export class AccountLine extends View<IAccountLineProps, IAccountLineStates> {

    constructor(props: any){
        super(props, []);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IAccountLineStates {
        return {
            
        };
    }



    ///
    /// User interactions
    ///

    private onItemEditClick(id: string) {
        this.getActionCreator().editAccountShow(id);
    }



    ///
    /// Render
    ///


	render() {
        let blockClass = "AccountLine ";
        let sum = this.props.account.sum == null ? 0 : this.props.account.sum;
        let typeClass = sum > 0 ? "Profit" : sum == 0 ? "Zero" :  "Debt";
        if (this.props.account.isDefault) blockClass += "Default ";

        // связанные данные
        let currency = this.props.currencyShow;

		return <div className={blockClass}>
            <span className="DefaultSpot"></span>
            {this.props.account.title}
            <span className={"Sum " + typeClass}>
                <span className="Value">{sum}</span><span className="Currency">{currency}</span>
            </span>
            <span className="Button Edit" onClick={e => this.onItemEditClick(this.props.account.id)} >EDIT</span>
        </div>;
	}


}





export default AccountLine;