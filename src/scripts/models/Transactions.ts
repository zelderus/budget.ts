

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
     * Вывод транзакции.
     */
    export class TransactionLine {
        id: string;
        date: Date;
        type: TransactionTypes;
        cost: number;

        // TODO: !!!
        currency: string;
        fromAccount: any; 
        toAccount?: any; 


        constructor (id: string, date: Date, type: TransactionTypes, currency: string, cost: number ) {
            this.id = id;
            this.date = date;
            this.type = type;
            this.currency = currency;
            this.cost = cost;
        }
    }


}

export default Transactions;