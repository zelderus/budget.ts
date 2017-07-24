

namespace Authentication {

    /**
     * Данные авторизации.
     */
    export class AuthenticationData implements IClientObjectResponse {
        
        private __userSessionKey: string;
        private __isAuth: boolean;
        private __name: string;
        private __isNewUser: boolean;


        constructor () {
            this.__isAuth = false;
            this.__isNewUser = true;
        }

        /**
         * Текущий ключ пользователя на сессию.
         */
        public getUserKey(): string { return this.__userSessionKey; }

        /**
         * Пользователь успешно авторизован.
         */
        public isAuth(): boolean { return this.__isAuth; }

        /**
         * Пользователь только зарегистрировался. Как правило, получит стартовый набор данных.
         */
        public isNewUser(): boolean { return this.__isNewUser; }

        /**
         * Имя.
         */
        public getName(): string { return this.__name; }






        public setName(name: string): void { this.__name = name; }


        


        fromJson (j: any): void {
            this.__userSessionKey = j.userKey;
            this.__isAuth = j.isAuth;
            this.__name = j.name;
            this.__isNewUser = j.isNew;
        }

        toJson(): any {
            let json = {
                userKey: this.__userSessionKey,
                isAuth: this.__isAuth,
                name: this.__name,
                isNew: this.__isNewUser
            };
            return json;
        }


    }


}

export default Authentication;