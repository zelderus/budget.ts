
import * as React from "react";




//export interface IAppNotYetProps { title: string; }

/**
 * Приложение еще не доступно.
 */
export class AppNotYet extends React.Component<undefined, undefined> {
	render(){
		return <div className="MainDomNotYet">
            <p>приложение в разработке</p>
        </div>;
	}
}