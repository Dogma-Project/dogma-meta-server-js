import * as Core from "@dogma-project/core-meta";
type ApiOptions = {
    apiport?: number;
    apihost?: string;
    static?: string;
};
declare const Api: (options?: ApiOptions) => void;
export { Core, Api };
