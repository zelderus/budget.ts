

//import {IClientServerResponse} from './../interfaces/data';

//import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';


namespace Mock {


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
                { "id": 5, "date": "2017-07-19T11:20:00", "type": 2, "cost": 28500, "currency": "rub" }
            ]
        };
    }
    export function getTransactionsJson() : string { return JSON.stringify(_getTransactions()); }

}

export default Mock;