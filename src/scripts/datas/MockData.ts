

//import {IClientServerResponse} from './../interfaces/data';

//import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';


namespace Mock {

    function _getUser() : IClientServerResponse {
        return {
            "success": true,
            "message": "",
            "data": { 
                userKey: "demo_session_key_" + (new Date()).getSeconds() + "_end_key",
                isAuth: true,
                name: "demo user"
            }
        };
    }
    export function getUserJson() : string { return JSON.stringify(_getUser()); }




    function _getAccounts() : IClientServerResponse {
        return {
            "success": true,
            "message": "",
            "data": [
                { "id": "47c7ff5d-9f61-405e-a8d1-e09a31fb1510", "title": "Кошелек", "sum": 12000, "order": 1 }
            ]
        };
    }
    export function getAccountsJson() : string { return JSON.stringify(_getAccounts()); }



    /*export function _getTransactions() : IClientServerResponse {
        return {
            "success": true,
            "message": "",
            "data": [
                { "id": 1, "date": "2017-07-18T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 2, "date": "2017-07-18T19:15:00", "type": 1, "cost": 700, "currency": "rub" }
            ]
        };
    }
    export function getTransactionsJson() : string { return JSON.stringify(_getTransactions()); }*/

}

export default Mock;