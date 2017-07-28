
import {EventSubscription} from "fbemitter";

namespace Flux {

    export type StoreCallback = () => any;
   
   /**
    * Обратный вызов через диспетчера.
    */
    export type DispatchCallBack = (success:boolean, errorMessage:string) => void;


    export interface IStore{


        // Emit Change event
        emitChange():void;

        // Add change listener
        addChangeListener(callback: StoreCallback, s: any) : EventSubscription;
        
        // Remove change listener
        removeChangeListener(callback: StoreCallback) : void;
        
    



        /**
         * Произошло действие. Диспетчер сообщает об этом.
         * - меняем состояния, модели объектов, обращаемся на сервер и прочее
         * - посылаем событие Change
         */
        onDispatch(type: number, obj: any, callBack?: DispatchCallBack):boolean;
    }

    

}


export default Flux;