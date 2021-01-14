var createError = require('http-errors');

/**
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function object
 */
module.exports.romannumeral =  (req, res, next) => {

    if(!req.query.query) {
        next(createError(400, 'Requires query param'));
        return;
    }

    let query = parseInt(req.query.query, 10);
    if(isNaN(query)) {
        next(createError(400, 'Query must be Integer'));
        return;
    }

    res.sendStatus(200)
}