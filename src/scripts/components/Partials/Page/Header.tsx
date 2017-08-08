

import * as React from "react";
import View from './../../../flux/View';
import Collections from './../../../utils/Collections';



export interface IPageHeaderProps { 
    title: string;
}

/*
        return <Header 
            title="Редактирование счета" 
        />
*/


/**
 * Заголовок
 */
export class Header extends View<IPageHeaderProps, {}> {

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
        return <div className="Header">
            {this.props.title}
        </div>
	}


}





export default Header;