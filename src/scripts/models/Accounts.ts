
namespace Accounts {



    /**
     * Счет.
     */
    export class AccountEntity implements IClientObjectResponse {
        id: string;
        title: string;
        order: number;
        sum: number;
        currencyId: string;

        constructor () {

        }


        fromJson (j: any): void {
            this.id = j.id;
            this.title = j.title;
            this.order = j.order;
            this.sum = j.sum;
            this.currencyId = j.currencyId;
        }

        toJson(): any {
            let json = {
                id: this.id,
                title: this.title,
                order: this.order,
                sum: this.sum,
                currencyId: this.currencyId
            };
            return json;
        }

        private _clonig(toNew: boolean = true, from: AccountEntity = null):AccountEntity  {
            let objTo = toNew ? new AccountEntity() : this;
            let objFrom = from == null ? this : from;
            //objTo = Object.create(objFrom);

            objTo.id = objFrom.id;
            objTo.title = objFrom.title;
            objTo.order = objFrom.order;
            objTo.sum = objFrom.sum;
            objTo.currencyId = objFrom.currencyId;
            return objTo;
        }
        clone(): AccountEntity {
            return this._clonig(true, null);
        }
        fill(from: AccountEntity): void {
            this._clonig(false, from);
        }


    }


    


    /**
     * Валидация формы счета.
     */
    export class AccountFormValidation {

        private _hasError: boolean;        

        constructor(entity: AccountEntity) {
            this._hasError = false;
            // TODO:
            
        }


        public hasError(): boolean {
            return this._hasError;
        }

    }


}

export default Accounts;