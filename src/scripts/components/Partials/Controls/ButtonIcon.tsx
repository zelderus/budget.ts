

import * as React from "react";
import View from './../../../flux/View';
import FormValidator from './../../../models/FormValidator';
import Collections from './../../../utils/Collections';

import IconData from './../../../datas/IconData';



export interface IControlButtonIconProps { 
    iconId: string;
    title: string;
    onClick: ()=>void;
    isDisabled?: boolean;
}

/*
        return <ButtonIcon 
            iconId={IconData.Icons.CREATE} 
            title="Название"
            onClick={ e=> this._onFormChangeAccountFrom(e) }
        />
*/


/**
 * Кнопка с иконкой
 */
export class ButtonIcon extends View<IControlButtonIconProps, {}> {

    private _icon: IconData.Icons;

    constructor(props: any){
        super(props, []);

        this._icon = new IconData.Icons(this.props.iconId);
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

        let iconId = this._icon.value; // this.props.iconId;
        let iconStyleName = "Icon_" + iconId;

        return <div className={"InpButtonIcon " + disabledStyle + iconStyleName} title={this.props.title} onClick={e => this.onClick(e)}></div>
	}


}





export default ButtonIcon;