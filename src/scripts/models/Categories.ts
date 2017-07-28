
namespace Categories {



    /**
     * Категория.
     */
    export class CategoryEntity implements IClientObjectResponse {
        id: string;
        title: string;
        order: number;
        icon: string;
        parentId?: string;

        constructor () {

        }


        fromJson (j: any): void {
            this.id = j.id;
            this.title = j.title;
            this.order = j.order;
            this.icon = j.icon;
            this.parentId = j.parentId;
        }

        toJson(): any {
            let json = {
                id: this.id,
                title: this.title,
                order: this.order,
                icon: this.icon,
                parentId: this.parentId,
            };
            return json;
        }

        private _clonig(toNew: boolean = true, from: CategoryEntity = null):CategoryEntity  {
            let objTo = toNew ? new CategoryEntity() : this;
            let objFrom = from == null ? this : from;
            //objTo = Object.create(objFrom);

            objTo.id = objFrom.id;
            objTo.title = objFrom.title;
            objTo.order = objFrom.order;
            objTo.icon = objFrom.icon;
            objTo.parentId = objFrom.parentId;
            return objTo;
        }
        clone(): CategoryEntity {
            return this._clonig(true, null);
        }
        fill(from: CategoryEntity): void {
            this._clonig(false, from);
        }


    }



    /**
     * Валидация формы категории.
     */
    export class CategoryFormValidation {

        private _hasError: boolean;        

        constructor(entity: CategoryEntity) {
            this._hasError = false;
            // TODO:
            
        }


        public hasError(): boolean {
            return this._hasError;
        }

    }


  


}

export default Categories;