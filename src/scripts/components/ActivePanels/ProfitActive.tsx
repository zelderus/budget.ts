

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';


export interface IProfitActiveProps {  }
export interface IProfitActiveStates {  }


/**
 * Панель - Доходы.
 */
export class ProfitActive extends View<IProfitActiveProps, IProfitActiveStates> {

    constructor(props: any){
        super(props, [AppStore]);

    }


    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IProfitActiveStates {
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
            prooofit
        </div>;
	}


}