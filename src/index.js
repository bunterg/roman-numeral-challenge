var createError = require('http-errors');
const express = require('express');
const app = express();
const port = 8080;

const controller = require('./controller');

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
