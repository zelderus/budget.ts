
namespace Accounts {



    /**
     * Счет.
     */
    export class AccountEntity implements IClientObjectResponse {
        id: string;
        title: string;
        order: number;


        constructor () {

        }


        fromJson (j: any): void {
            this.id = j.id;
            this.title = j.title;
            this.order = j.order;
        }

        toJson(): any {
            let json = {
                id: this.id,
                title: this.title,
                order: this.order
            };
            return json;
        }

    }


    /**
     * Валидация формы счета.
     */
    export class AccountFormValidation {

        private _hasError: boolean;        

        constructor(hasError: boolean) {
            this._hasError = hasError;
        }


        public hasError(): boolean {
            return this._hasError;
        }

    }


}

export default Accounts;