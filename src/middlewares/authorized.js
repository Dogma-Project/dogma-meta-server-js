const { User } = require("../database/models.js");
const { GROUPS, CLIENT_STATUSES, ERRORS } = require("../../constants.js");
const ClientError = require("../helpers/clientError.js");

module.exports = async function authorized(req, res, next) {
    try {
        // console.log("AUTHORIZED", req.baseUrl);
        const { id } = req.user;
        const user = await User.findById(id);
        if (!user) return next(new ClientError({
            status: CLIENT_STATUSES.FORBIDDEN,
            code: ERRORS.USER_NOT_FOUND
        }));
        const { group } = user;
        if (group === GROUPS.BANNED) return next(new ClientError({
            status: CLIENT_STATUSES.FORBIDDEN,
            code: ERRORS.USER_BANNED
        }));
        req.user = { ...req.user, group };
        next();
    } catch (err) {
        next(err);
    }
}