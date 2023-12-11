const { CLIENT_STATUSES, ERRORS, TOKENS } = require("../../constants.js");
const ClientError = require("../helpers/clientError.js");
const { verifyJWT } = require("../helpers/jwt.js");

module.exports = async function authenticated(req, res, next) {
    if (req.headers.authorization) {
        const parsed = req.headers.authorization.split(" ");
        const [type, token] = parsed;
        if (!type || type !== "Bearer" || !token) return next(new ClientError({
            code: ERRORS.INVALID_TOKEN,
            status: CLIENT_STATUSES.UNAUTHORIZED
        }));

        try {
            const decoded = await verifyJWT(token);
            const { userId, tokenType, validUntil } = decoded;
            if (tokenType !== TOKENS.ACCESS) return next(new ClientError({
                code: ERRORS.INVALID_JWT_TYPE,
                status: CLIENT_STATUSES.UNAUTHORIZED
            }));
            if (Date.now() > validUntil) return next(new ClientError({
                code: ERRORS.EXPIRED_ACCESS_TOKEN,
                status: CLIENT_STATUSES.UNAUTHORIZED
            }));
            req.user = {
                id: userId,
            }
            next();
        } catch (err) {
            return next(new ClientError({
                code: ERRORS.JWT_ERROR,
                status: CLIENT_STATUSES.UNAUTHORIZED
            }));
        }
    } else {
        next(new ClientError({
            code: ERRORS.NOT_SIGNED,
            status: CLIENT_STATUSES.UNAUTHORIZED
        }));
    }
}