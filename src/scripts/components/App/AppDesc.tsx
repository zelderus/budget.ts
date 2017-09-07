

import * as React from "react";
import { ENTER_KEY, ESCAPE_KEY } from "./../../constants";




export interface IAppDescProps { title: string; }
/**
 * Описание приложения.
 */
export class AppDesc extends React.Component<IAppDescProps, undefined> {
	render(){
		return <div className="AppDesc">
            <p>ZeDK - Your budget. Простое и быстрое приложение для внесения данных о своих расходах и доходах.</p>
            <p>Данная версия приложения написана с использованием TypeScript + React и является аналогом приложения с WindowsPhone (<a href="http://zelder.pro/soft/zedkbudget" target="_blank">ссылка</a>).</p>
            <p>В этой версии применяется паттерн Flux. Все события идут в одном направлении, все заинтересованные компоненты реагируют как им удобно. А React в связке с TypeScript показался более удобным для такого приложения под web.</p>
        </div>;
	}
}



