
import FluxUtils from './../flux/Utils';


namespace FormValidator {

    /**
     * Ошибка валидации.
     */
    export class ValidatorField {
        public key: number;
        public message: string;
        constructor(key: number, message: string) {
            this.key = key;
            this.message = message;
        }
    }


    /**
     * Форма валидации.
     */
    export class Validator<T> {
        private __errors: ValidatorField[] = [];

        constructor() {

        }
        /**
         * Есть ли ошибка в форме.
         */
        public hasError(): boolean { return this.__errors.length > 0; }
        /**
         * Очистка всех ошибок.
         */
        public clearErrors(): void { this.__errors = new Array<ValidatorField>(); }
        /**
         * Выдает ошибку валидации по ключу, если есть.
         * @param key 
         */
        public getError(key: number): ValidatorField { return this.__errors.filter(f => f.key == key)[0]; }
        /**
         * Добавление ошибки в форму валидации.
         * @param key 
         * @param message 
         */
        protected addError(key: number, message: string): void {
            let exist = this.getError(key);
            if (exist == null) this.__errors.push(new ValidatorField(key, message));
            else exist.message = message;
        }
        /**
         * Проверка формы валидации.
         * Этот метод необходимо переопределить.
         * @param entity 
         */
        public validate(entity: T): void {
            this.clearErrors();
            
            let errMsg = "необходимо переопределить метод 'validate' у объекта: " + FluxUtils.getClassName(this);
            this.addError(-999, errMsg);
            FluxUtils.logError(errMsg);
        }


        //
        // Помогаторы валидации
        //

        protected errIsNull(val: any, key: number, errMsg: string): void { if (this.checkIsNull(val)) this.addError(key, errMsg); }
        protected checkIsNull(val: any): boolean {
            return (val == null);
        }
        
        protected errStringIsNullOrEmpty(val: any, key: number, errMsg: string): void { if (this.checkStringIsNullOrEmpty(val)) this.addError(key, errMsg); }
        protected checkStringIsNullOrEmpty(val: string): boolean {
            return (val == null || val === "");
        }
        
        protected errNumberIsNullOrZero(val: any, key: number, errMsg: string): void { if (this.checkNumberIsNullOrZero(val)) this.addError(key, errMsg); }
        protected checkNumberIsNullOrZero(val: any): boolean {
            return (val == null || val == 0);
        }


    }


}

export default FormValidator;