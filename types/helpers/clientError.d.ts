type ClientErrorParams = {
    status: number;
    code: number;
    payload?: object;
};
declare class ClientError extends Error {
    status: number;
    code: number;
    payload?: object;
    constructor(params: ClientErrorParams);
}
export default ClientError;
