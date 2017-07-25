

namespace Authentication {

    /**
     * Данные авторизации.
     */
    export class AuthenticationData implements IClientObjectResponse {
        
        private __userSessionKey: string;
        private __isAuth: boolean;
        private __name: string;
 

        constructor () {
            this.__isAuth = false;
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
         * Имя.
         */
        public getName(): string { return this.__name; }






        public setName(name: string): void { this.__name = name; }


        


        fromJson (j: any): void {
            this.__userSessionKey = j.userKey;
            this.__isAuth = j.isAuth;
            this.__name = j.name;
        }

        toJson(): any {
            let json = {
                userKey: this.__userSessionKey,
                isAuth: this.__isAuth,
                name: this.__name
            };
            return json;
        }


    }


}

export default Authentication;