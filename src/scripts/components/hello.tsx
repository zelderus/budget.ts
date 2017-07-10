
import * as React from "react";


export interface HelloProps { compiler: string; framework: string }

export class Hello extends React.Component<HelloProps, undefined> {
	render(){
		return <div className="MainDom">Hello from {this.props.compiler} and {this.props.framework}!</div>;
	}
}