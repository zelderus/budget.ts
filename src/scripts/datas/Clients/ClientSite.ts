
import BClient from './../BaseClient';
import Mock from './../MockData';
import {IClient} from './../ClientManager';

import Authentication from './../../models/Authentication';
import Accounts from './../../models/Accounts';
import Transactions from './../../models/Transactions';
import Currencies from './../../models/Currencies';
import Categories from './../../models/Categories';


namespace Client {

 





    /**
     * Клиент для обращейни к сайту.
     */
    export class ClientSite extends BClient.BaseClient implements IClient {

        constructor() {
            super();
        }



        /**
         * Регистрация пользователя.
         */
        registration(userName: string, userPass: string, callBack: BClient.IClientResponse<Authentication.AuthenticationData>): void {
            this.getFromJsonModel(Mock.getUserJson(), Authentication.AuthenticationData, callBack);
        }

        /**
         * Авторизация.
         * @param userName 
         * @param userPass 
         * @param callBack 
         */
        authentication(userName: string, userPass: string, callBack: BClient.IClientResponse<Authentication.AuthenticationData>): void {
            this.getFromJsonModel(Mock.getUserJson(), Authentication.AuthenticationData, callBack);
        }

        

        /**
         * Валюты.
         */
        getCurrencies(callBack: BClient.IClientResponse<Currencies.CurrencyEntity[]>): void {
            callBack(false, "получение валют не реализованно в этом клиенте", null);
        }
        editCurrency(currency: Currencies.CurrencyEntity, callBack: BClient.IClientResponse<Currencies.CurrencyFormValidation>): void {
            callBack(false, "редактирование валют не реализованно в этом клиенте", null);
        }




        /**
         * Категории.
         */
        getCategories(callBack: BClient.IClientResponse<Categories.CategoryEntity[]>): void {
            callBack(false, "получение категорий не реализованно в этом клиенте", null);
        }
        editCategory(category: Categories.CategoryEntity, callBack: BClient.IClientResponse<Categories.CategoryFormValidation>): void {
            callBack(false, "редактирование категорий не реализованно в этом клиенте", null);
        }




        /**
         * Счета.
         */
        getAccounts(callBack: BClient.IClientResponse<Accounts.AccountEntity[]>): void {
            let self = this;

            self.getModels("public/fakes/accounts.json", {}, Accounts.AccountEntity, callBack);
        }

        /**
         * Редактирование счета.
         */
        editAccount(account: Accounts.AccountEntity, callBack: BClient.IClientResponse<Accounts.AccountFormValidation>): void {
            let self = this;
            // TODO: Редактирование счета

            // оповещаем
            let validation = new Accounts.AccountFormValidation(account);
            callBack(false, "редактирование счета не реализованно в этом клиенте", validation);
        }


        /**
         * Транзакции.
         */
        getTransactions(filters: Transactions.TransactionFilters, callBack: BClient.IClientResponse<Transactions.TransactionEntity[]>) : void {
            let self = this;

            self.getModels("public/fakes/transactions.json", filters, Transactions.TransactionEntity, callBack);
        }

        /**
         * Редактирование транзакции.
         */
        editTransaction(transaction: Transactions.TransactionEntity, withRecalculations: boolean, callBack: BClient.IClientResponse<Transactions.TransactionFormValidation>): void {
            let self = this;
            // TODO: Редактирование транзакции

            // оповещаем
            let validation = new Transactions.TransactionFormValidation(transaction);
            callBack(false, "редактирование транзакции не реализованно в этом клиенте", validation);
        }

        /**
         * Удаление транзакции.
         */
        deleteTransaction(transactionId: string, withRecalculations: boolean, callBack: BClient.IClientResponse<any>) : void {
            let self = this;
            // TODO: Удаление транзакции

            callBack(false, "удаление транзакции не реализованно в этом клиенте", null);
        }


        

    }


}

//export default new Client.ClientSite;
export default Client.ClientSite;