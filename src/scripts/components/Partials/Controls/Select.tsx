

import * as React from "react";
import View from './../../../flux/View';


export interface IControlSelectDefault {
    key: string;
    text: string;
}

export interface IControlSelectProps { 
    name: string;
    currentKey?: any;
    list: any[];
    objKey: string;
    objText: string;
    default?: IControlSelectDefault;
    onChange: (val:string)=>void;
    emptyText?: string;
}

/*
        return <Select 
            name="accountFrom" 
            currentKey={this.state.accountId}
            list={this.state.accounts}
            objKey="id"
            objText="title"
            default={ {key:"", text:"- без счета -"} }
            onChange={ e=> this._onFormChangeAccountFrom(e) }
            emptyText="нет данных"
        />
*/


/**
 * Список
 */
export class Select extends View<IControlSelectProps, {}> {

    constructor(props: any){
        super(props, []);

    }



    ///
    /// User interactions
    ///


    private _onFormChangeAccountFrom(e: any): void {
        let val = e.target.value;
        this.props.onChange(val);
    }



    ///
    /// Render
    ///


	render() {
        let currId = this.props.currentKey;
        let list = this.props.list
        let keyName = this.props.objKey;
        let textName = this.props.objText;

        let defaultOption = this.props.default == null ? null : 
            <option value={this.props.default.key} selected={currId==this.props.default.key}>{this.props.default.text}</option>

        let options = list.map(a => {
            return <option value={a[keyName]} selected={currId==a[keyName]}>{a[textName]}</option>}
        );

        // если пусто
        if (this.props.default == null && (list == null || list.length == 0)) {
            return <select name={this.props.name} disabled={true}>
                <option hidden={true} selected={true}>{this.props.emptyText == null ? "нет данных" : this.props.emptyText}</option>
            </select>
        }

        return <select name={this.props.name} onChange={e => this._onFormChangeAccountFrom(e)}>
            {defaultOption}
            {options}
        </select>
	}


}





export default Select;