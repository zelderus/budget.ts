

import * as React from "react";
import View from './../../../flux/View';
import Collections from './../../../utils/Collections';



export interface IPageCol1Props { 
    notRender?: boolean;
    obj1: JSX.Element
}

/*
        return <Col1 
            obj1={<Input.../>}
        />
*/


/**
 * Разметка - одна колонка
 */
export class Col1 extends View<IPageCol1Props, {}> {

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
        if (this.props.notRender != null && this.props.notRender == true) return null;
        return <div className="PageCol1">
            {this.props.obj1}
        </div>
	}


}





export default Col1;