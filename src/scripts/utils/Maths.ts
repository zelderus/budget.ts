

export namespace Maths {


    /**
     * Сумма на основе строки ввода (100+200*50..).
     * @param costStr 
     */
    export function calculateSum (costStr: string): number {
        let cost:number = 0;
        if (costStr == null || costStr === "") return 0;
        let costNum:number = Number(costStr);
        if (costNum != null && !isNaN(costNum)) return costNum;
        cost = 0;
        // TODO: calculator
        return cost;
    };


    /**
     * Выводит не целое число с определенным количеством цифр после запятой.
     * @param num число
     * @param slices количество цифр после запятой
     */
    export function numberFormat(num: number, slices: number = 2): string {
        return ("0" + num).slice(-slices);
    }



}


export default Maths;