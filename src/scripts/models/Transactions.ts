

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
    export class TransactionLine implements IClientObjectResponse {
        id: string;
        date: Date;
        type: TransactionTypes;
        cost: number;

        // TODO: !!!
        currency: string;
        fromAccount: any; 
        toAccount?: any; 


        constructor() {
        
        }

        fromJson (j: any): void {
            this.id = j.id;
            this.date = new Date(j.date);
            this.type = <Transactions.TransactionTypes>j.type;
            this.currency = j.currency;
            this.cost = j.cost;
        }


    }


}

export default Transactions;