

namespace Transactions {

    export enum TransactionTypes {
        Spend   = 1,
        Profit  = 2
    }

    /**
     * Вывод транзакции.
     */
    export class TransactionLine {
        id: string;
        date: Date;
        type: TransactionTypes;
        currency: string; // TODO: !!!
        cost: number;


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