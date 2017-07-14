
namespace Accounts {



    /**
     * Счет.
     */
    export class AccountLine {
        id: string;
        title: string;
        order: number;



        constructor (id: string, title: string, order: number ) {
            this.id = id;
            this.title = title;
            this.order = order;
        }
    }


}

export default Accounts;