


import Ajax from './../plugins/Ajax';


namespace Client {

    /**
     * Ответ от клиента.
     */
    export interface IClientResponse<T> { (success:boolean, msg: string, val: T): void }
 


    /**
     * Базовый клиент.
     */
    export class BaseClient {

        constructor() {

        }

        //
        // Парсилки из JSON
        //

        private _parseToModel<T extends IClientObjectResponse>(json: string, c: new()=>T) : IClientServerParsedModelResponse<T> {
            let dataModel = <IClientServerResponse>JSON.parse(json);
            let d = <any>dataModel.data || {};
            let model = new c();
            model.fromJson(d);
            return { success: dataModel.success, message: dataModel.message, data: model };
        }
        private _parseToModels<T extends IClientObjectResponse>(json: string, c: new()=>T) : IClientServerParsedModelsResponse<T> {
            let dataModel = <IClientServerResponse>JSON.parse(json);
            let lines = <any[]>dataModel.data || [];
            let models = new Array<T>();
            lines.forEach((d) => {
                let model = new c();
                model.fromJson(d);
                models.push(model);
            });
            return { success: dataModel.success, message: dataModel.message, data: models };
        }


        protected getFromJsonModel<T extends IClientObjectResponse>(json: string, c: new()=>T, callBack: IClientResponse<T>): void {
            let self = this;
            let resp = self._parseToModel(json, c);
            callBack(resp.success, resp.message, resp.data);
        }
        protected getFromJsonModels<T extends IClientObjectResponse>(json: string, c: new()=>T, callBack: IClientResponse<T[]>): void {
            let self = this;
            let resp = self._parseToModels(json, c);
            callBack(resp.success, resp.message, resp.data);
        }


        /**
         * GET запрос и получение модели данных типа 'IClientResponse<T>', где 'data' - модель типа 'T'.
         * @param url 
         * @param sendData 
         * @param c тип модели, который будет помещен в 'data'
         * @param callBack 
         */
        protected getModel<T extends IClientObjectResponse>(url: string, sendData: any, c: new()=>T, callBack: IClientResponse<T>) : void {
            let self = this;
            Ajax.get(
                url, 
                sendData, 
                (data) => {
                    self.getFromJsonModel(data, c, callBack);
                },
                (errorMsg) => {
                    callBack(false, errorMsg, null);
                }
            );
        }

        /**
         * GET запрос и получение модели данных типа 'IClientResponse<T[]>', где 'data' - модель типа 'T[]'.
         * @param url 
         * @param sendData 
         * @param c тип модели, который будет помещен в 'data'
         * @param callBack 
         */
        protected getModels<T extends IClientObjectResponse>(url: string, sendData: any, c: new()=>T, callBack: IClientResponse<T[]>) : void {
            let self = this;
            Ajax.get(
                url, 
                sendData, 
                (data) => {
                    self.getFromJsonModels(data, c, callBack);
                },
                (errorMsg) => {
                    callBack(false, errorMsg, null);
                }
            );
        }

        /**
         * POST запрос и получение модели данных типа 'IClientResponse<T>', где 'data' - модель типа 'T'.
         * @param url 
         * @param sendData 
         * @param c тип модели, который будет помещен в 'data'
         * @param callBack 
         */
        protected postModel<T extends IClientObjectResponse>(url: string, sendData: any, c: new()=>T, callBack: IClientResponse<T>) : void {
            let self = this;
            Ajax.post(
                url, 
                sendData, 
                (data) => {
                    self.getFromJsonModel(data, c, callBack);
                },
                (errorMsg) => {
                    callBack(false, errorMsg, null);
                }
            );
        }

        /**
         * POST запрос и получение модели данных типа 'IClientResponse<T[]>', где 'data' - модель типа 'T[]'.
         * @param url 
         * @param sendData 
         * @param c тип модели, который будет помещен в 'data'
         * @param callBack 
         */
        protected postModels<T extends IClientObjectResponse>(url: string, sendData: any, c: new()=>T, callBack: IClientResponse<T[]>) : void {
            let self = this;
            Ajax.post(
                url, 
                sendData, 
                (data) => {
                    self.getFromJsonModels(data, c, callBack);
                },
                (errorMsg) => {
                    callBack(false, errorMsg, null);
                }
            );
        }






        



    }


}

export default Client;