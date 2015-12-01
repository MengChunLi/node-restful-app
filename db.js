/**
 * 連線資料庫獨立成一隻檔案，可重複使用
 * 每一次被require，會是同一個db object，因為第一次require時已經Cached
 */
var MongoClient = require('mongodb').MongoClient;

var state = {
  db: null,
};

exports.connect = function(url, done) {
  if (state.db) return done();

  MongoClient.connect(url, function(err, db) {
    if (err) return done(err);
    state.db = db;
    done();
  })
};

exports.get = function() {
  return state.db;
};

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null;
      state.mode = null;
      done(err);
    });
  }
};