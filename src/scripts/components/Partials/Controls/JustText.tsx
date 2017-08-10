

import * as React from "react";
import View from './../../../flux/View';
import FormValidator from './../../../models/FormValidator';
import Collections from './../../../utils/Collections';



export interface IControlJustTextProps { 
    title: string;
    value?: any;
}

/*
        return <JustText 
            title="Название"
            value={this.state.title}
        />
*/


/**
 * Текст
 */
export class JustText extends View<IControlJustTextProps, {}> {

    constructor(props: any){
        super(props, []);

    }



    ///
    /// User interactions
    ///






    ///
    /// Render
    ///


	render() {

        return <div className="InpJustText">
            <div className="Title">{this.props.title}</div>
            <div className="Wrap">
                <div className="Field">
                    <span>{this.props.value}</span>
                </div>
            </div>
        </div>
	}


}





export default JustText;