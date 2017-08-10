

import * as React from "react";
import View from './../../../flux/View';
import Collections from './../../../utils/Collections';
import FormValidator from './../../../models/FormValidator';

export interface IControlSelectDefault {
    key: string;
    text: string;
}

export interface IControlSelectProps { 
    name: string;
    title: string;
    currentKey?: any;
    list: any[];
    objKey: string;
    objText: string;
    default?: IControlSelectDefault;
    onChange: (val:string)=>void;
    emptyText?: string;
    errorText?: string;
    error?: FormValidator.ValidatorField;
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
            errorText="- текущего элемента нет в списке -"
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

        let error = this.props.error;
        let hasError = error!=null;
        let isRequired = false;

        // если выбран элемент, но его нет в списке, и нет пункта поумолчанию - то отображаем пункт с ошибкой
        let isSelectedNotExistsInList = (currId != null && (Collections.contains(list, (e)=>{ return e[keyName] == currId })==false)) ? true : false;
        let errorOption = this.props.default != null || !isSelectedNotExistsInList ? null :
            <option value={null} selected={true}>{this.props.errorText == null ? "- текущего элемента нет в списке -" : this.props.errorText}</option>

        // значение по умолчанию
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


        return <div className={"InpSelect " + (hasError?"Error ":"") + (isRequired?"Required":"")}>
            <div className="Title">{this.props.title}</div>
            <div className="Wrap">
                <div className="Field">
                    <select name={this.props.name} onChange={e => this._onFormChangeAccountFrom(e)}>
                        {/*errorOption*/}
                        {defaultOption}
                        {options}
                    </select>
                </div>
                <div className={"Error " + (hasError?"Has":"No")}>{hasError?error.message:""}</div>
            </div>
        </div>
        
	}


}





export default Select;