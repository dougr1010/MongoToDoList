var express = require('express');
var app = express();
var router = express.Router();
var ToDo = require('../../models/toDo');

//var bodyParser = require('body-parser');
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));


/* receive one task from client and write to db */
router.post('/add', function(request, response){
    console.log('hit /toDo/add endpoint');
    console.log(request);
    //var toDo = new ToDo(request.body);
    //toDo.save(function(err){
    //    console.log('error on db write: ',err);
    //});
    //console.log('adding ToDo item');
    //console.log(response);
});


/* receive list data from client */
 router.post('/sendToServer', function(request, response, next){
 console.log('hit /sendToServer endpoint');
 console.log(request.body);
 })


module.exports = router;
