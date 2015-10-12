var express = require('express');
var app = express();
var router = express.Router();
var ToDo = require('../../models/toDo');


/* receive one task from client and write to db */
router.post('/add', function(request, response){
    console.log('hit /toDo/add endpoint');
    console.log(request.body);
    var toDo = new ToDo(request.body);
    toDo.save(function(err, saveresp){
        if(err)  console.log('error on db write: ',err);
        console.log('adding ToDo item');
        console.log(saveresp);
        console.log(saveresp._id);
    });
    response.send('server/finished adding.');
});

/* get tasks from db */
router.get('/getData', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    console.log('hit toDo/getData endpoint');
    ToDo.find(function(err,someTasks){
        if(err) console.log('error: ',err);
        //console.log('server/some tasks: ')
        //console.log(someTasks);
        res.send(someTasks);
    })
});

//delete a document from the db
router.post('/delete', function(request, response){
    var id=request.body.id;
    console.log('hit /toDo/remove endpoint');
    console.log('id to remove: ',id)
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
    var id=request.body.id;
    var updatedTask = request.body.task;
    console.log('hit /toDo/update endpoint');
    console.log('id to update: ',id);
    console.log('updated task: ', updatedTask);
    ToDo.findByIdAndUpdate(id, {$set:{task:updatedTask}},function(err,toDo){
        if(err) console.log(err);
        //res.send(toDo);
    })
});





/* remove a task/document from the db
router.delete('/delete/:id', function(request, response, next){
    console.log('hit /toDo/remove endpoint');
    ToDo.findOne({id: request.params.id}, function(err, toDo) {
        console.log('server: ',request.params.id);
        if (err) {
            console.log(err);
            next(err);
        } else {
            if (toDo){
                toDo.remove(function (err) {
                if (err) {
                    console.log(err);
                    next(err);
                } else {
                    response.send(200);
                }
            })
        }
         else
        {
            response.sendStatus('id not found')
        }
        }
    })
});
*/





    //
    //toDo.findOne({_id})
    //var toDo = new ToDo(request.body);
    //toDo.save(function(err, saveresp){
    //    if(err)  console.log('error on db write: ',err);
    //    console.log('adding ToDo item');
    //    console.log(saveresp);
    //    console.log(saveresp._id);
    //});
    //response.send('server/finished adding.');


//obsolete
/* receive list data from client
 router.post('/sendToServer', function(request, response, next){
 console.log('hit /sendToServer endpoint');
 console.log(request.body);
 })
 */

module.exports = router;
