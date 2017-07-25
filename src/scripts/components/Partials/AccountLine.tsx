

import * as React from "react";
import View from './../../flux/View';
//import AppStore from './../../stores/AppStore';

import Accounts from './../../models/Accounts';


export interface IAccountLineProps { account: Accounts.AccountEntity  }
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




    ///
    /// Render
    ///


	render() {
        let sum = this.props.account.sum == null ? 0 : this.props.account.sum;
        let typeClass = sum > 0 ? "Profit" : sum == 0 ? "Zero" :  "Debt";


        // TODO: тянем связанные данные
        let currency = "rub";

		return <div className="AccountLine">
            {this.props.account.title}
            <span className={"Sum " + typeClass}>
                <span className="Value">{sum}</span><span className="Currency">{currency}</span>
            </span>
        </div>;
	}


}





export default AccountLine;