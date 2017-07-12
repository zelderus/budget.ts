
import FluxUtils from './../flux/Utils';
import * as Actions from './../actions/Actions';


/**
 * Базовый виджет.
 */
export class BaseWidget implements IWidget {

    constructor(){
    }


    /**
     * ActionCreator - система сообщений, через которую все компоненты оповещают приложение о новых событиях в одном направлении.
     * - этот метод можно использовать, если лень импортировать пространство имен ('import Actions from './actions/Actions';')
     */
    protected getActionCreator(): Actions.Actions.ActionCreator {
        return Actions.default;
    }


    public draw() {
        FluxUtils.logError("Не реализован метод 'draw' в виджете '"+ FluxUtils.getClassName(this) +"'");
        return;
    }


}

export default BaseWidget;