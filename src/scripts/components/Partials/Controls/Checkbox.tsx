

import * as React from "react";
import View from './../../../flux/View';
import FormValidator from './../../../models/FormValidator';
import Collections from './../../../utils/Collections';



export interface IControlCheckboxProps { 
    name: string;
    title: string;
    checked: boolean;
    onChange?: (val:boolean)=>void;

}

/*
        return <Checkbox 
            name="accountName" 
            title="Кредитка"
            checked={this.state.isCredit}
            onChange={ e=> this._onFormChangeCredit(e) }
        />
*/


/**
 * Выбиралка
 */
export class Checkbox extends View<IControlCheckboxProps, {}> {

    constructor(props: any){
        super(props, []);

    }



    ///
    /// User interactions
    ///


    private onChange(e: any): void {
        let val = e.target.value;
        //console.log(val); // TODO
        if (this.props.onChange != null) this.props.onChange(val);
    }



    ///
    /// Render
    ///


	render() {

        return <div className={"InpCheckbox "}>
            <div className="Title">{this.props.title}</div>
            <div className="Wrap">
                <div className="Field">
                    <input type="checkbox" name={this.props.name} checked={this.props.checked} onChange={e => this.onChange(e)} />
                </div>
            </div>
        </div>
	}


}





export default Checkbox;