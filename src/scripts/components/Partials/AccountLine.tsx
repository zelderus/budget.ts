

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

		return <div className="AccountLine">
            {this.props.account.title}
        </div>;
	}


}





export default AccountLine;