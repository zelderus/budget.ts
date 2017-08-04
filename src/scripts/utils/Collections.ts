

export namespace Collections {


    /**
     * Возвращает элемент по условию, либо null.
     * @param list 
     * @param condition 
     */
    export function first<T> (list: T[], condition:(el:T)=>boolean): T {
        //return list.filter(f => condition(f))[0];
        if (list == null) return null;
        for (let item of list) {
            if (condition(item)) { 
                return item;
            }
        }
        return null;
    }


    /**
     * Содержит ли список элемент.
     * @param list 
     */
    export function contains<T> (list: T[], condition:(el:T)=>boolean): boolean {
        if (list == null) return null;
        for (let item of list) {
            if (condition(item)) { 
                return true;
            }
        }
        return false;
    }



}


export default Collections;