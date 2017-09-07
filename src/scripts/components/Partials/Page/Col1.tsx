

import * as React from "react";
import View from './../../../flux/View';
import Collections from './../../../utils/Collections';



export interface IPageCol1Props { 
    notRender?: boolean;
    rowIndex?: number;  // номер ряда, для отделения по стилю четные от нечетных
    obj1: JSX.Element
}

/*
        return <Col1 
            rowIndex={index++}
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
        let rowStyle = ""; //! не подсвечиваем //this.props.rowIndex != null && this.props.rowIndex % 2 == 0 ? "Odd" : "";

        return <div className={"PageCol1 " + rowStyle}>
            {this.props.obj1}
        </div>
	}


}





export default Col1;