var db = require('../db');

exports.toJSON = function(cb) {
    var collection = db.get().collection('userlist');
    // collection.find({},{},function(err, docs){
    //     cb(err, docs);
    // });
    collection.find().toArray(function(err, docs){
        cb(err, docs);
    });
};

exports.addUser = function(body, cb){
    var collection = db.get().collection('userlist');
    collection.insert(body, function(err, result){
        cb(err, result);
    });
};

exports.removeUser = function(item, cb){
    var collection = db.get().collection('userlist');
    console.log(collection);
    collection.remove(item, function(err){
        cb(err);
    });
};