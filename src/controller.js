var createError = require('http-errors');
var { convertIntegerToRoman } = require('./models/roman')

/**
 * 
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next function object
 */
module.exports.romannumeral =  (req, res, next) => {

    if(!req.query || !req.query.query) {
        next(createError(400, 'Requires query param'));
        return;
    }

    let query = parseInt(req.query.query, 10);
    if(isNaN(query) || query !== parseFloat(req.query.query, 10) ) {
        next(createError(400, 'Query must be Integer'));
        return;
    }

    let extension = parseInt(req.query.extension) || 0;

    let romanNumeral;
    try {
        romanNumeral = convertIntegerToRoman(query, extension)
    } catch(err) {
        next(createError(400, 'Query must be between 1 and 255'));
    }

    res.status(200);
    res.send(romanNumeral);
}