

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';


export interface IAccountActiveProps {  }
export interface IAccountActiveStates {  }


/**
 * Панель - счета.
 */
export class AccountActive extends View<IAccountActiveProps, IAccountActiveStates> {

    constructor(props: any){
        super(props, [TransactionStore]);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IAccountActiveStates {
        return {
            
        };
    }



    ///
    /// User interactions
    ///




    ///
    /// Render
    ///



	render(){

		return <div className="AccountActive">
            счетаааа
        </div>;
	}


}