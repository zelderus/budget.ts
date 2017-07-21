

//import {IClientServerResponse} from './../interfaces/data';

//import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';


namespace Mock {

    function _getUser() : IClientServerResponse {
        return {
            "success": true,
            "message": "",
            "data": { 
                userKey: "demo_session_key_" + (new Date()).getUTCDate() + "_end_key",
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
                { "id": 1, "title": "Кошелек", "summ": 12000, "order": 1 },
                { "id": 2, "title": "Кредитка", "summ": 100, "order": 3 },
                { "id": 3, "title": "Вклад", "summ": 5000, "order": 2 }
            ]
        };
    }
    export function getAccountsJson() : string { return JSON.stringify(_getAccounts()); }



    export function _getTransactions() : IClientServerResponse {
        return {
            "success": true,
            "message": "",
            "data": [
                { "id": 1, "date": "2017-07-18T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 2, "date": "2017-07-18T19:15:00", "type": 1, "cost": 700, "currency": "rub" },
                { "id": 3, "date": "2017-07-05T09:23:00", "type": 2, "cost": 55000, "currency": "rub" },
                { "id": 4, "date": "2017-07-19T08:48:00", "type": 1, "cost": 320, "currency": "rub" },
                { "id": 5, "date": "2017-07-19T11:20:00", "type": 2, "cost": 28500, "currency": "rub" },
                { "id": 6, "date": "2017-07-17T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 7, "date": "2017-07-16T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 8, "date": "2017-07-15T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 9, "date": "2017-07-14T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 10, "date": "2017-07-13T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 11, "date": "2017-07-12T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 12, "date": "2017-07-11T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 13, "date": "2017-07-10T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 14, "date": "2017-07-09T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 15, "date": "2017-07-08T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
                { "id": 16, "date": "2017-07-07T12:30:00", "type": 1, "cost": 400, "currency": "rub" },
            ]
        };
    }
    export function getTransactionsJson() : string { return JSON.stringify(_getTransactions()); }

}

export default Mock;