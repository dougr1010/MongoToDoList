var express = require('express');
var router = express.Router();
var path = require('path');


/* get HTML page. */
router.get('/', function(req, res, next) {
    console.log('hit index.html endpoint');
    res.sendFile(path.join(__dirname,'../public/views/index.html'))
});


module.exports = router;
