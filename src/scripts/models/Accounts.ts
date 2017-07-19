
namespace Accounts {



    /**
     * Счет.
     */
    export class AccountLine implements IClientObjectResponse {
        id: string;
        title: string;
        order: number;


        constructor () {

        }


        fromJson (j: any): void {
            this.id = j.id;
            this.title = j.title;
            this.order = j.order;
        }

    }


}

export default Accounts;