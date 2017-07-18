
var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/posts', function(req, res, next) {


    var db = req.db;
    var collection = db.get('User');
  /*  collection.findOne({location:{$near:{$geometry:{type:"Point",coordinates:[-91.9612,41.01329]},$maxDistance:2000}}},function(err,data){
        if(err)throw err;*/
        collection.findOne({"email": "ermias@yahoo.com"},function(err,data){
            if(err)throw err;

        console.log(data);

        res.json(data);
    });
});



module.exports = router;