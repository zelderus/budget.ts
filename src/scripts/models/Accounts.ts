
import FormValidator from './FormValidator';
import IconData from './../datas/IconData';


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
        isCredit: boolean;
        creditLimit: number;
        iconId: string;
        isDefault: boolean;

        constructor () {
            this.id = null;
            this.isCredit = false;
            this.creditLimit = 0;
            this.currencyId = null;
            this.iconId = null;
            this.isDefault = false;
        }


        fromJson (j: any): void {
            this.id = j.id;
            this.title = j.title;
            this.order = j.order;
            this.sum = j.sum;
            this.currencyId = j.currencyId;
            this.isCredit = j.isCredit;
            this.creditLimit = j.creditLimit;
            this.iconId = j.iconId;
            this.isDefault = j.isDefault;
        }

        toJson(): any {
            let json = {
                id: this.id,
                title: this.title,
                order: this.order,
                sum: this.sum,
                currencyId: this.currencyId,
                isCredit: this.isCredit,
                creditLimit: this.creditLimit,
                iconId: this.iconId,
                isDefault: this.isDefault
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
            objTo.isCredit = objFrom.isCredit;
            objTo.creditLimit = objFrom.creditLimit;
            objTo.iconId = objFrom.iconId;
            objTo.isDefault = objFrom.isDefault;
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
     * Ключи ошибок валидации.
     */
    export enum AccountFormValidationKeys {
        Title       = 1,
        Currency    = 2,
        Sum         = 3,
        CreditLimit = 4

    }


    /**
     * Валидация формы счета.
     */
    export class AccountFormValidation extends FormValidator.Validator<AccountEntity> {
        constructor() {
            super();
        }
        public validate(entity: AccountEntity): void {
            this.clearErrors();

            this.validateTitle(entity);
            this.validateCurrency(entity);
            // TODO:
        }

        public validateTitle(entity: AccountEntity, withDeleteError: boolean = false): void {
            if (withDeleteError) this.deleteError(AccountFormValidationKeys.Title);
            this.errStringIsNullOrEmpty(entity.title, AccountFormValidationKeys.Title, "введите название");
        }
        public validateCurrency(entity: AccountEntity, withDeleteError: boolean = false): void {
            if (withDeleteError) this.deleteError(AccountFormValidationKeys.Currency);
            this.errIsNull(entity.currencyId, AccountFormValidationKeys.Currency, "укажите валюту");
        }

    }


}

export default Accounts;