
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

    function send (url: string, callback: (obj:any)=>void, onerror: (msg:string)=>void, method: string, data: any, async: any): void {
        if (async === undefined) {
            async = true;
        }
        var x = _x();
        x.open(method, url, async);
        x.onreadystatechange = function () {
            if (x.readyState == XMLHttpRequest.DONE) { // 4
                if (x.status == 200) {
                    callback(x.responseText);
                }
                else if (x.status == 400) {
                    onerror("400 ("+ x.statusText + "); " + url);
                }
                else if (x.status == 404) {
                    onerror("404 ("+ x.statusText + "); " + url);
                }
                else {
                    onerror(x.statusText);
                }
            }
        };
        x.onabort = function(d: any) {
            onerror(x.statusText);
        }
        x.onerror = function(d: any) {
            onerror(x.statusText);
        }
        if (method == 'POST') {
            x.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        }
        x.send(data);
    };

    export function get (url: string, data: any, callback: (obj:any)=>void, onerror: (msg:string)=>void, async?: any): void {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        send(url + (query.length ? '?' + query.join('&') : ''), callback, onerror, 'GET', null, async)
    };

    function post (url: string, data: any, callback: (obj:any)=>void, onerror: (msg:string)=>void, async?: any): void {
        var query = [];
        for (var key in data) {
            query.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
        }
        send(url, callback, onerror, 'POST', query.join('&'), async);
    };

}


export default Ajax;