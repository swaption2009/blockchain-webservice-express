/* ===== Persist data with LevelDB ==============================
|  Learn more: level: https://github.com/Level/level            |
|  =============================================================*/


module.exports = {
  // Add data to levelDB with key/value pair
  addLevelDBData: function(db, key, value){
    return new Promise(function(resolve, reject) {
      db.put(key, JSON.stringify(value), function(err) {
        if (err) return console.log('Block ' + key + ' submission failed', err);
        resolve(value)
      });
    });
  },

  // Get data from levelDB with key
  getLevelDBData: function(db, key){
    return new Promise(function(resolve, reject) {
      db.get(key, function(err, value) {
        if (err) return err;
        resolve(value);
      });
    });
  },
}
