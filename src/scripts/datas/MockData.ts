

import Accounts from './../models/Accounts';
import Transactions from './../models/Transactions';


namespace Mock {

    function _getDate(year: number, month: number, day: number, hours: number, minutes: number, seconds: number): Date {
        return new Date(year, month, day, hours, minutes, seconds, 0);
    }


    export function getAccounts() : Accounts.AccountLine[] {
        return [
            new Accounts.AccountLine('1', 'Кошелек', 1),
            new Accounts.AccountLine('2', 'Кредитка', 2)
        ];
    }


    export function getTransactions() : Transactions.TransactionLine[] {
        return [
            new Transactions.TransactionLine().fromSome('1', _getDate(2017, 5, 10, 13, 20, 0), Transactions.TransactionTypes.Spend, "rub", 400),
            new Transactions.TransactionLine().fromSome('2', _getDate(2017, 5, 10, 20, 40, 0), Transactions.TransactionTypes.Spend, "rub", 2400),
            new Transactions.TransactionLine().fromSome('3', _getDate(2017, 5, 11, 10, 15, 0), Transactions.TransactionTypes.Profit, "rub", 55000),
            new Transactions.TransactionLine().fromSome('4', _getDate(2017, 5, 11, 19, 50, 0), Transactions.TransactionTypes.Spend, "rub", 1750),
            new Transactions.TransactionLine().fromSome('5', _getDate(2017, 5, 12, 13, 10, 0), Transactions.TransactionTypes.Spend, "rub", 400),
        ];
    }


}

export default Mock;