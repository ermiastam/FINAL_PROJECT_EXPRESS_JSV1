
var express = require('express');
var ObjectId = require('mongodb').ObjectID;
var router = express.Router();

/* GET users listing. */


router.get('/posts/post/:id', function(req, res, next) {

    var id =req.params.id;
    //var id=123;
    var db = req.db;
    var collection = db.bind('post');
    collection.findOne({"_id":ObjectId(id)},{_id:0},
        function(err,data){
            if(err)throw err;
            /*collection.find({"email": "ermias@yahoo.com"},function(err,data){
             if(err)throw err;
             */
            console.log(data);

            res.json(data);
        });
});


router.get('/posts/jobOwner/:email', function(req, res, next) {

    var email =req.params.email;
    console.log(email);
    //var id=123;
    var db = req.db;
    var collection = db.bind('User');
    collection.find({$and:[{"email":email}]}).toArray(
        function(err,data){
            if(err)throw err;
            /*collection.find({"email": "ermias@yahoo.com"},function(err,data){
             if(err)throw err;
             */
            console.log("hello data"+data.toString());

            res.json(data);
        });
});


router.get('/posts', function(req, res, next) {

    // var email=req.params.email;
    // console.log(email);
    var db = req.db;
    var collection = db.bind('post');
    collection.find({$and:[{location:{$near:{$geometry:{type:"Point",coordinates:[-91.9612,41.01329]},$maxDistance:2000}}}]}).limit(10).toArray(

        function(err,data){
            if(err)throw err;
            /*collection.find({"email": "ermias@yahoo.com"},function(err,data){
             if(err)throw err;
             */
            console.log(data);

            res.json(data);
        });
});

router.post('/posts/apply/', function(req, res, next) {
   var  email = req.body.email;
   var id =  req.body.id;
   console.log(email);
   console.log(id);

    var db = req.db;
    var collection = db.bind('post');
    collection.update({"_id":ObjectId(id)},{$push:{'applicantsEmail':email}},
        function(err,data){
            if(err)throw err;
            /*collection.find({"email": "ermias@yahoo.com"},function(err,data){
             if(err)throw err;
             */
            console.log(data);

            res.json(data);
        });
})

router.post('/posts/check/', function(req, res, next) {
    var  email = req.body.email;
    var id = req.body.id;


    var db = req.db;
    var collection = db.bind('post');
    collection.findOne({$and:[{"_id":ObjectId(id)},{applicantsEmail:{$in: [email]}}]},
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