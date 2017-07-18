
export namespace Ajax {

    function _x (): any {
        if (typeof XMLHttpRequest !== 'undefined') {
            return new XMLHttpRequest();
        }
        var versions = [
            "MSXML2.XmlHttp.6.0",
            "MSXML2.XmlHttp.5.0",
            "MSXML2.XmlHttp.4.0",
            "MSXML2.XmlHttp.3.0",
            "MSXML2.XmlHttp.2.0",
            "Microsoft.XmlHttp"
        ];

        var xhr;
        for (var i = 0; i < versions.length; i++) {
            try {
                xhr = new ActiveXObject(versions[i]);
                break;
            } catch (e) {
            }
        }
        return xhr;
    };

    function send (url: string, callback: (obj:any)=>void, method: string, data: any, async: any): void {
        if (async === undefined) {
            async = true;
        }
        var x = _x();
        x.open(method, url, async);
        x.onreadystatechange = function () {
            if (x.readyState == 4) {
                callback(x.responseText);
            }
        };
        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        x.send(data);
    };

    export function get (url: string, data: any, callback: (obj:any)=>void, async?: any): void {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        send(url + (query.length ? '?' + query.join('&') : ''), callback, 'GET', null, async)
    };

    function post (url: string, data: any, callback: (obj:any)=>void, async?: any): void {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        send(url, callback, 'POST', query.join('&'), async);
    };

}


export default Ajax;