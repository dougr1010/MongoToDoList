var express = require('express');
var app = express();
var router = express.Router();
var ToDo = require('../../models/toDo');


/* receive one task from client and write to db */
router.post('/add', function(request, response){
    console.log('hit /toDo/add endpoint');
    var toDo = new ToDo(request.body);
    toDo.save(function(err, saveresp){
        if(err)  console.log('error on db write: ',err);
    });
    response.send('server/finished adding.');
});


/* get tasks from db */
router.get('/getData', function(req, res, next) {
    console.log('hit toDo/getData endpoint');
    ToDo.find(function(err, someTasks){
        if(err) console.log('error: ',err);
        res.send(someTasks);
    })
});


//delete a task from the db
router.post('/delete', function(request, response){
    console.log('hit /toDo/remove endpoint');
    var id=request.body.id;
    ToDo.findById(id, function(err, toDo) {
        if (err) throw err;
        toDo.remove(function (err) {
            if (err) throw err;
            response.sendStatus(200);
        })
    })
});


//update the task in an existing document in the db
router.post('/update', function(request, response){
    console.log('hit /toDo/update endpoint');
    var id=request.body.id;
    var updatedTask = request.body.task;
    ToDo.findByIdAndUpdate(id, {$set:{task:updatedTask}}, function(err,toDo){
        if(err) console.log(err);
        response.sendStatus(200);
    })
});

module.exports = router;
