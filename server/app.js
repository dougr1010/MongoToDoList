var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('mongoose');
var mongoURI = "mongodb://localhost:27017/toDo";
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});
MongoDB.once('open', function () {
    console.log('mongodb connection open!');
});

var routes = require('./routes/index');
app.use('/', routes);

var toDo = require('./routes/toDo');
app.use('/toDo', toDo);

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(3000, function(){
    var port = server.address().port;
    console.log('Listening on port: ', port);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
