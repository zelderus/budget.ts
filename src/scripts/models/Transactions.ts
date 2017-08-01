
import FormValidator from './FormValidator';


namespace Transactions {


    /**
     * Фильтры транзакций. Используется Клиентом при запросах к данным.
     */
    export class TransactionFilters {
        packType: number = 1;  // пакет - размерность выборки (день,месяц,год)
        dateFrom?: Date;       // диапазаон дат?(если не указано, то берем от последней транзакции пакет)
        dateTo?: Date;
        transactionType?: TransactionTypes; // тип транзакций

        constructor() {
            this.packType = 1;
        }
    }


    /**
     * Типы транзакции.
     */
    export enum TransactionTypes {
        Spend       = 1,    // расход
        Profit      = 2,    // доход
        Transfer    = 3     // перевод на другой счет
    }

    

    /**
     * Сущность транзакции.
     */
    export class TransactionEntity implements IClientObjectResponse {
        id: string;
        date: Date;
        type: TransactionTypes;
        cost: number;
        costStr: string;
        accountFromId: string;
        accountToId?: string;
        comment: string;


        constructor() {
            this.id = "";
            this.date = new Date();
            this.costStr = "";
            this.type = Transactions.TransactionTypes.Spend;
            this.accountFromId = null;
        }

        fromJson (j: any): void {
            this.id = j.id;
            this.date = new Date(j.date);
            this.type = <Transactions.TransactionTypes>j.type;
            this.cost = j.cost;
            this.comment = j.comment;
            this.accountFromId = j.accountFromId;
            this.accountToId = j.accountToId;
        }

        toJson(): any {
            let json = {
                id: this.id,
                date: this.date,
                type: this.type,
                cost: this.cost,
                comment: this.comment,
                accountFromId: this.accountFromId,
                accountToId: this.accountToId
            };
            return json;
        }


        private _clonig(toNew: boolean = true, from: TransactionEntity = null):TransactionEntity  {
            let objTo = toNew ? new TransactionEntity() : this;
            let objFrom = from == null ? this : from;
            //objTo = Object.create(objFrom);

            objTo.id = objFrom.id;
            objTo.date = objFrom.date;
            objTo.type = objFrom.type;
            objTo.cost = objFrom.cost;
            objTo.comment = objFrom.comment;
            objTo.accountFromId = objFrom.accountFromId;
            objTo.accountToId = objFrom.accountToId;
            return objTo;
        }
        clone(): TransactionEntity {
            return this._clonig(true, null);
        }
        fill(from: TransactionEntity): void {
            this._clonig(false, from);
        }

    }



    /**
     * Ключи ошибок валидации.
     */
    export enum TransactionFormValidationKeys {
        Cost        = 1
        
    }

    /**
     * Валидация формы транзакции.
     */
    export class TransactionFormValidation extends FormValidator.Validator<TransactionEntity> {
        constructor() {
            super();
        }
        public validate(entity: TransactionEntity): void {
            this.clearErrors();

            // TODO: валидация транзакции
            this.errNumberIsNullOrZero(entity.cost, TransactionFormValidationKeys.Cost, "укажите сумму");
            

        }

    }







}

export default Transactions;