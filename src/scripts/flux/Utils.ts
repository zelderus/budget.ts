


namespace FluxUtils{

    /**
     * Имя класса (типа).
     */
    export function getClassName (obj: any) : string { 
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((obj).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }

    /**
     * GUID.
     */
    export function guidGenerator(): string {
        var S4 = function () {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
    }



    export function logStyle(msg: string, style: string): void {
        if (!console) return;
        if (!style) style = 'background: #F22; color: #FFFF66; padding: 0 4px;';
        console.log("%c" + msg, style);
    }
    export function logRed(msg: string): void { logStyle(msg, 'background: #F22; color: #FFFF66; padding: 0 4px;'); }
    export function logGreen(msg: string): void { logStyle(msg, 'background: #ECF8EC; color: #339933; padding: 0 4px;'); }
    export function logYellow(msg: string): void { logStyle(msg, 'background: #FFFAE5; color: #FF7B24; padding: 0 4px;'); }
    export function log(msg: string): void { logYellow(msg); }
    export function logError(msg: string): void { logRed(msg); }


}


export default FluxUtils;