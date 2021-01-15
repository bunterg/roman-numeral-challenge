var createError = require('http-errors');
const express = require('express');
var morgan = require('morgan');
var path = require('path');
var rfs = require('rotating-file-stream');

const app = express();
const port = 8080;

const controller = require('./controller');

// Setup service logging
if(process.env.NODE_ENV == 'production') {
    // create a rotating write stream
    var accessLogStream = rfs.createStream('access.log', {
        interval: '1d', // rotate daily
        path: path.join(__dirname, '..', 'log')
    })
    
    // setup the logger
    app.use(morgan('combined', { stream: accessLogStream }))
} else {
    // setup the logger
    app.use(morgan('dev'))
}

app.get('/romannumeral', controller.romannumeral)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // send the error message
    res.status(err.status || 500);
    res.json('error');
});

var server = app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


module.exports = server;
