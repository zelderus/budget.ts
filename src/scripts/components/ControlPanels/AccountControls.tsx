

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';



export interface IAccountControlsProps {  }
export interface IAccountControlsStates { }


/**
 * Управление - счета.
 */
export class AccountControls extends View<IAccountControlsProps, IAccountControlsStates> {

    constructor(props: any){
        super(props, [TransactionStore]);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IAccountControlsStates {
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
		return <div className="AccountControls">
            controools account
        </div>;
	}


}