var createError = require('http-errors');

/**
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function object
 */
module.exports.romannumeral =  (req, res, next) => {
    if(!req.query.query) {
        createError(400, 'Requires query param')
    }
}