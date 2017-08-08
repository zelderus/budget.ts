

import * as React from "react";
import View from './../../../flux/View';
import FormValidator from './../../../models/FormValidator';
import Collections from './../../../utils/Collections';



export interface IControlInputProps { 
    name: string;
    title: string;
    value?: any;
    onChange?: (val:any)=>void;
    error?: FormValidator.ValidatorField;

}

/*
        return <Input 
            name="accountName" 
            title="Название"
            value={this.state.title}
            onChange={ e=> this._onFormChangeAccountFrom(e) }
            error={this.state.validator.getError(Currencies.CurrencyFormValidationKeys.Title)}
        />
*/


/**
 * Список
 */
export class Input extends View<IControlInputProps, {}> {

    constructor(props: any){
        super(props, []);

    }



    ///
    /// User interactions
    ///


    private onChange(e: any): void {
        let val = e.target.value;
        if (this.props.onChange != null) this.props.onChange(val);
    }



    ///
    /// Render
    ///


	render() {
        let error = this.props.error;
        let hasError = error!=null;
        let isRequired = false;

        return <div className={"InpInput " + (hasError?"Error ":"") + (isRequired?"Required":"")}>
            <div className="Title">{this.props.title}</div>
            <div className="Wrap">
                <div className="Field">
                    <input name={this.props.name} value={this.props.value} onChange={e => this.onChange(e)} />
                </div>
                <div className={"Error " + (hasError?"Has":"No")}>{hasError?error.message:""}</div>
            </div>
        </div>
	}


}





export default Input;