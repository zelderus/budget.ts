

import * as React from "react";
import { ENTER_KEY, ESCAPE_KEY } from "./../constants";




export interface IAppDescProps { title: string; }
/**
 * Описание приложения.
 */
export class AppDesc extends React.Component<IAppDescProps, undefined> {
	render(){
		return <div className="AppDesc">
            <p>ZeDK - Your budget. Простое и быстрое приложение для внесения данных о своих расходах и доходах.</p>
            <p>Данная версия приложения написана с использованием TypeScript + React и является аналогом приложения с WindowsPhone (<a href="http://zelder.pro/soft/zedkbudget" target="_blank">ссылка</a>).</p>
        </div>;
	}
}



