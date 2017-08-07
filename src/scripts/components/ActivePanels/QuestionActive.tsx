

import * as React from "react";
import View from './../../flux/View';
import TransactionStore from './../../stores/TransactionStore';
import AppStore from './../../stores/AppStore';
import CurrencyStore from './../../stores/CurrencyStore';
import {BaseActive, IBaseActiveProps} from './BaseActive';

import Accounts from './../../models/Accounts';
import AccountLine from './../Partials/AccountLine';



export interface IQuestionActiveStates {  
    message: string;
    callOnSuccess: SimpleCallback;
}


/**
 * События от контрола.
 */
export enum QuestionCmdEvents {
    OK       = 1
}


/**
 * Панель - вопрос.
 */
export class QuestionActive extends BaseActive<IQuestionActiveStates> {

    constructor(props: any){
        super(props, [AppStore]);

    }



    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IQuestionActiveStates {
        return {
            message: AppStore.questionText(),
            callOnSuccess: AppStore.questionCallbackOnSuccess()
        };
    }



    /**
     * Получили событие от управления.
     * @param eventName 
     */
    public onEventFromControls(eventId: number): void {
        let event = eventId as QuestionCmdEvents;
        switch(eventId) {
            case QuestionCmdEvents.OK:
                this._onSuccess();
                break;
        }
    }


    ///
    /// User interactions
    ///

    private _onSuccess(): void {
        if (this.state.callOnSuccess != null) this.state.callOnSuccess();
    }


    ///
    /// Render
    ///


	render(){

		return <div className="QuestionActive">
            <div className="Text">{this.state.message}</div>
        </div>;
	}


}