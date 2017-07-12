


namespace FluxUtils{

    /**
     * Имя класса.
     */
    export function getClassName (obj: any) : string { 
        var funcNameRegex = /function (.{1,})\(/;
        var results = (funcNameRegex).exec((obj).constructor.toString());
        return (results && results.length > 1) ? results[1] : "";
    }

}


export default FluxUtils;