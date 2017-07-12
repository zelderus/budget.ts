


namespace Flux {

    export type StoreCallback = () => any;
   
    export interface IStore{


        // Emit Change event
        emitChange():void;

        // Add change listener
        addChangeListener(callback: StoreCallback, s: any) : any;
        
        // Remove change listener
        removeChangeListener(callback: StoreCallback) : void;
        
    



        /**
         * Произошло действие. Диспетчер сообщает об этом.
         * - меняем состояния, модели объектов, обращаемся на сервер и прочее
         * - посылаем событие Change
         */
        onDispatch(type: number, obj: any):boolean;
    }

    

}


export default Flux;