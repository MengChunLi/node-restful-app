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