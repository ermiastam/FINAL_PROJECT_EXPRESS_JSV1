
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/posts', function(req, res, next) {


    var db = req.db;
    var collection = db.bind('post');
     collection.find({location:{$near:{$geometry:{type:"Point",coordinates:[-91.9612,41.01329]},$maxDistance:2000}}}).limit(1).toArray(
    function(err,data){
        if(err)throw err;
        /*collection.find({"email": "ermias@yahoo.com"},function(err,data){
            if(err)throw err;
*/
        console.log(data);

        res.json(data);
    });
});



module.exports = router;