

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
     * Валидация формы транзакции.
     */
    export class TransactionFormValidation {

        private _hasError: boolean;        

        constructor(hasError: boolean) {
            this._hasError = hasError;
        }


        public hasError(): boolean {
            return this._hasError;
        }

    }



    /**
     * Сущность транзакции.
     */
    export class TransactionEntity implements IClientObjectResponse {
        id: string;
        date: Date;
        type: TransactionTypes;
        cost: number;
        accountFromId: string;
        accountToId?: string;
        comment: string;


        constructor() {
            this.id = "";
            this.date = new Date();
            this.type = Transactions.TransactionTypes.Spend;
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


        clone():TransactionEntity  {
            return Object.create(this);
        }

    }







}

export default Transactions;