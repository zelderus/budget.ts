

import * as React from "react";
import View from './../../../flux/View';
import Collections from './../../../utils/Collections';



export interface IPageCol2Props { 
    notRender?: boolean;
    rowIndex?: number;  // номер ряда, для отделения по стилю четные от нечетных
    obj1: JSX.Element
    obj2: JSX.Element
}

/*
        return <Col2 
            notRender={true}
            rowIndex={index++}
            obj1={<Input.../>}
            obj2={<Input.../>}
        />
*/


/**
 * Разметка - две колонки
 */
export class Col2 extends View<IPageCol2Props, {}> {

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

        let rowStyle = this.props.rowIndex != null && this.props.rowIndex % 2 == 0 ? "Odd" : "";
        /*return <div className="PageCol2">
            <div className="PageCol2Left">{this.props.obj1}</div>
            <div className="PageCol2Right">{this.props.obj2}</div>
            <div className="Clear"></div>
        </div>*/
        return <div className={"PageCol2 " + rowStyle}>
            <table>
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <tr>
                    <td>{this.props.obj1}</td>
                    <td>{this.props.obj2}</td>
                </tr>
            </table>
        </div>
	}


}





export default Col2;