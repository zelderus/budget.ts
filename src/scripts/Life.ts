
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
            this.__user = user;
        }

        /**
         * Данные текущего авторизованного пользователя.
         */
        public getUser(): Authentication.AuthenticationData { return this.__user; }

    }


}

export default new Life.LifeManager;
