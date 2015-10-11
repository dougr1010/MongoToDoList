var express = require('express');
var router = express.Router();
var path = require('path');


/* get HTML page. */
router.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    console.log('hit index.html endpoint')
    res.sendFile(path.join(__dirname,'../public/views/index.html'))
});



/* receive list data from client */
router.post('/sendToServer', function(request, response, next){
    console.log('hit /sendToServer endpoint in index');
    console.log(request.body);
})


module.exports = router;
