

import * as React from "react";
import View from './../../../flux/View';
import FormValidator from './../../../models/FormValidator';
import Collections from './../../../utils/Collections';




/**
 * Стили кнопки.
 */
export enum ControlButtonTextStyles {
    Normal      = 1,
    Success     = 2,
    Alert       = 3
}

export interface IControlButtonTextProps { 
    title: string;
    onClick: ()=>void;
    isDisabled?: boolean;
    showStyle?: ControlButtonTextStyles;
}

/*
        return <ButtonText 
            title="Название"
            onClick={ e=> this._onFormChangeAccountFrom(e) }
        />
*/


/**
 * Кнопка с текстом
 */
export class ButtonText extends View<IControlButtonTextProps, {}> {


    constructor(props: any){
        super(props, []);

    }



    ///
    /// User interactions
    ///


    private onClick(e: any): void {
        if (this.props.isDisabled != null && this.props.isDisabled == true) return;
        if (this.props.onClick != null) this.props.onClick();
    }



    ///
    /// Render
    ///


	render() {
        let disabledStyle = (!this.props.isDisabled || this.props.isDisabled != true) ? "" : "Disabled ";
        let showStyle = "ButtonStyle_" + this.props.showStyle;

        return <div className={"InpButtonText " + disabledStyle + showStyle} title={this.props.title} onClick={e => this.onClick(e)}>{this.props.title}</div>
	}


}





export default ButtonText;