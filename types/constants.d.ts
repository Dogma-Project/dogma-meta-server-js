export declare enum DEFAULTS {
    API_PORT = 3334,
    ADMIN_NAME = "admin",
    USERNAME = "Dogma user"
}
export declare enum GROUPS {
    BANNED = -1,
    GUEST = 0,
    USER = 1,
    MANAGER = 2,
    ADMIN = 3,
    OWNER = 4,
    TEST = 5
}
export declare const ERRORS: {
    PAGE_NOT_FOUND: number;
    USER_NOT_FOUND: number;
    PASSWORD_NOT_MATCH: number;
    USER_ALREADY_EXISTS: number;
    INVALID_CREDENTIALS: number;
    INVALID_LOGIN_CODE: number;
    INVALID_NODE_PREFIX: number;
    KEY_IS_NOT_EMPTY: number;
    UNKNOWN_KEY_TYPE: number;
    NOT_SIGNED: number;
};
export declare const CLIENT_STATUSES: {
    BAD_REQUEST: number;
    UNAUTHORIZED: number;
    ERROR: number;
    FORBIDDEN: number;
    NOT_FOUND: number;
};
export declare const SERVER_STATUSES: {
    INTERNAL_ERROR: number;
};
