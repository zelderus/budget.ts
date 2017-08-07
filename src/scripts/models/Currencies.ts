
import FormValidator from './FormValidator';


namespace Currencies {



    /**
     * Валюта.
     */
    export class CurrencyEntity implements IClientObjectResponse {
        id: string;
        title: string;
        show: string;
        order: number;

        constructor () {

        }


        fromJson (j: any): void {
            this.id = j.id;
            this.title = j.title;
            this.show = j.show;
            this.order = j.order;
        }

        toJson(): any {
            let json = {
                id: this.id,
                title: this.title,
                show: this.show,
                order: this.order,
            };
            return json;
        }

        private _clonig(toNew: boolean = true, from: CurrencyEntity = null):CurrencyEntity  {
            let objTo = toNew ? new CurrencyEntity() : this;
            let objFrom = from == null ? this : from;
            //objTo = Object.create(objFrom);

            objTo.id = objFrom.id;
            objTo.title = objFrom.title;
            objTo.show = objFrom.show;
            objTo.order = objFrom.order;
            return objTo;
        }
        clone(): CurrencyEntity {
            return this._clonig(true, null);
        }
        fill(from: CurrencyEntity): void {
            this._clonig(false, from);
        }


    }





    /**
     * Ключи ошибок валидации.
     */
    export enum CurrencyFormValidationKeys {
        Title       = 1,
        ShowName    = 2
    }


    /**
     * Валидация формы валюты.
     */
    export class CurrencyFormValidation extends FormValidator.Validator<CurrencyEntity> {
        constructor() {
            super();
        }
        public validate(entity: CurrencyEntity): void {
            this.clearErrors();

            this.errStringIsNullOrEmpty(entity.title, CurrencyFormValidationKeys.Title, "введите название");
            this.errStringIsNullOrEmpty(entity.show, CurrencyFormValidationKeys.ShowName, "укажите строку вывода");
        }
    }





}

export default Currencies;