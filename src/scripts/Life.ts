
import Authentication from './models/Authentication';





namespace Life {

    

    /**
     * Глобальные данные на все приложение.
     */
    export class LifeManager {

        private __user: Authentication.AuthenticationData;

        constructor() {
            
        }

        public setUserAuth(user: Authentication.AuthenticationData): void {
            if (user == null || user === undefined) this.__user = new Authentication.AuthenticationData();
            else this.__user = user;
        }

        /**
         * Данные текущего авторизованного пользователя.
         */
        public getUser(): Authentication.AuthenticationData { return this.__user; }


        /**
         * Вывод стоимости/суммы.
         * @param money 
         */
        public showMoney(money: number): string {
            // TODO: вывод +-, вывод разделителей тысячных, вывод копеек..
            return money.toString();
        }

    }


}

export default new Life.LifeManager;
