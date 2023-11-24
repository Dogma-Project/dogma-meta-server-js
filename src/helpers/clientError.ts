import { ERRORS } from "../constants";

type ClientErrorParams = {
  status: number;
  code: number;
  payload?: object;
};

class ClientError extends Error {
  status: number;
  code: number;
  payload?: object;

  constructor(params: ClientErrorParams) {
    super();
    this.status = params.status;
    this.code = params.code;
    const errors = Object.entries(ERRORS);
    const err = errors.find(([key, val]) => params.code === val);
    if (err) {
      this.name = err[0];
    }
    if (params.payload) {
      this.payload = params.payload;
    }
  }
}

export default ClientError;
