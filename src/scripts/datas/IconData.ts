



namespace IconData {


    /*
    Enum строковый поддерживается в TypeScript начиная с версии 2.4, пока откажемся от этого
    export enum Icons {
        Empty           = "Empty",

        CAR1            = "CAR1",
        CAR2            = "CAR2"
    }
    */

    export class Icons
    {
        constructor(public value:string) { }
        toString() { return this.value; }

        static empty = new Icons("empty");


        static car1 = new Icons("car1");
        static car2 = new Icons("car2");
    }


    /**
     * Икноки для выбора в списке.
     */
    export function GetIconsForSelect(): Icons[] {
        let icons = [ 
            Icons.empty,
            Icons.car1, Icons.car2
            
        ];
        return icons;
    }







}

export default IconData;