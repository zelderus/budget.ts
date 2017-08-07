

import * as React from "react";
import View from './../../flux/View';
import AppStore from './../../stores/AppStore';
import {BaseControls, IBaseControlsProps} from './BaseControls';
import {QuestionActive, QuestionCmdEvents} from './../ActivePanels/QuestionActive';


export interface IQuestionControlsProps extends IBaseControlsProps {  }
export interface IQuestionControlsStates { }


/**
 * Управление - вопрос.
 */
export class QuestionControls extends BaseControls<IQuestionControlsProps, IQuestionControlsStates> {

    constructor(props: any){
        super(props, []);

    }




    // Интересующие нас состояния (получаем их строго из Сторов)
    protected getState() : IQuestionControlsStates {
        return {
            
        };
    }



    ///
    /// User interactions
    ///

    private onButtonOk(){
        this.getActionCreator().navigationBack();
        this.sendEventToActivePanel(QuestionCmdEvents.OK); // отсылаем сообщение, после закрытия окна
    }

    private onButtonCancel(){
        this.getActionCreator().navigationBack();
    }
 


    ///
    /// Render
    ///


	render() {
		return <div className="QuestionControls">
            <div className="Buttons">
                <div className="Button Alert" onClick={e => this.onButtonOk()}>подтвердить</div>
                <div className="Button Normal" onClick={e => this.onButtonCancel()}>отмена</div>
            </div>
        </div>;
	}


}