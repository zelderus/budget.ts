

/**
 * Формат каждого ответа с сервера
 */
interface IClientServerResponse { success:boolean, message: string, data: any }

interface IClientServerParsedModelResponse<T> { success:boolean, message: string, data: T }
interface IClientServerParsedModelsResponse<T> { success:boolean, message: string, data: T[] }

interface IClientObjectResponse { fromJson (j: any): void; toJson(): any; }


