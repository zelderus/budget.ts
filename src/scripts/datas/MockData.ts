

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




    function _getCurrencies() : IClientServerResponse {
        return {
            "success": true,
            "message": "",
            "data": [
                { "id": "1b78233f-87b6-47d6-9a4c-bc686b77bc05", "title": "Рубль", "show": "руб.", "order": 1 },
                { "id": "d45c054f-3f40-4300-96c1-e186d7021a1b", "title": "Доллар", "show": "$", "order": 2 }
            ]
        };
    }
    export function getCurrenciesJson() : string { return JSON.stringify(_getCurrencies()); }


    function _getCategories() : IClientServerResponse {
        return {
            "success": true,
            "message": "",
            "data": [
                { "id": "6f3cb43b-8fbf-477f-a6cc-fdcfe005b793", "title": "Обеды", "order": 1, "icon": "", "parentId": null },
                { "id": "a7232405-1319-4227-aae3-d071712c8a39", "title": "Кварплата", "order": 10, "icon": "", "parentId": null },
                { "id": "1e1c737e-d230-4d30-82ee-c485a606c2b6", "title": "Электроэнергия", "order": 11, "icon": "", "parentId": "a7232405-1319-4227-aae3-d071712c8a39" },
                { "id": "722afd26-51a3-4a30-9b35-c283a44b9b62", "title": "ЖКХ", "order": 12, "icon": "", "parentId": "a7232405-1319-4227-aae3-d071712c8a39" },
            ]
        };
    }
    export function getCategoriesJson() : string { return JSON.stringify(_getCategories()); }




    function _getAccounts() : IClientServerResponse {
        return {
            "success": true,
            "message": "",
            "data": [
                { "id": "47c7ff5d-9f61-405e-a8d1-e09a31fb1510", "title": "Кошелек", "sum": 12000, "order": 1, "currencyId": "1b78233f-87b6-47d6-9a4c-bc686b77bc05" },
                { "id": "47c7ff5d-9f61-405e-a8d1-e09a31fb1512", "title": "Вклад", "sum": 0, "order": 2, "currencyId": "1b78233f-87b6-47d6-9a4c-bc686b77bc05" },
                { "id": "47c7ff5d-9f61-405e-a8d1-e09a31fb1513", "title": "Валюта", "sum": 0, "order": 3, "currencyId": "d45c054f-3f40-4300-96c1-e186d7021a1b" }
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