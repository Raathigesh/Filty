var Keyy = (function(){
  var currentKey,
  _IsKeyInArray = function(array){
    var results = false;
    for(var i = 0; i < array.length - 1; i++) {
        if(currentKey === array[i]){
            results = true;
            break;
        }
    }
    return results;
  },
  Key = function(key){
    currentKey = key;
    return this;
  },
  When = function(key, callback){
    if(currentKey == key){
      callback();
    }
    return this;
  },
  WhenNotAnyOf = function(){
      if(!_IsKeyInArray(arguments)){
        arguments[arguments.length - 1]();
      }
  };

  return {
    Key: Key,
    When: When,
    WhenNotAnyOf: WhenNotAnyOf
  };
}());

module.exports = Keyy;
