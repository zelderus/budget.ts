

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
        accountFromId: string;
        accountToId?: string;
        comment: string;


        constructor() {
            this.id = "";
            this.date = new Date();
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

    }




    /**
     * Транзакция с данными для вывода.
     */
    export class TransactionLine extends TransactionEntity implements IClientObjectResponse {

        currency: string;

        constructor() {
            super();
        }

        fromJson (j: any): void {
            super.fromJson(j);
            this.currency = j.currency;

        }


    }


}

export default Transactions;