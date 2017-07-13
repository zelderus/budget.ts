

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';


export interface ISpendActiveProps {  }
export interface ISpendActiveStates {  }


/**
 * Панель - Расходы.
 */
export class SpendActive extends View<ISpendActiveProps, ISpendActiveStates> {

    constructor(props: any){
        super(props, [AppStore]);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : ISpendActiveStates {
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

		return <div className="Act">
            speeeend
        </div>;
	}


}