var connection = require("./connection.js");

//Helper function to print question marks("?,?")
function printQuestMarks(arrLength){
    var questArr = [];
    for (var i = 0; i < arrLength; i++) {
        //build array of quest marks based on parameter
        questArr.push("?");
    }
    return questArr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  }
  
var orm = {
    selectAll: function(tableInput, cb) {
      var queryString = "SELECT * FROM ??" ;
      connection.query(queryString, [tableInput], function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },
    insertOne: function(tableInput, cols, vals, cb) {
      console.log("I am in the insert function------orm.js");
      var queryString = "INSERT INTO " + tableInput;
      queryString += "(";
      queryString += cols.toString();
      queryString += ") ";
      queryString += "VALUES(";
      queryString += printQuestMarks(vals.length);
      queryString += ")";
      console.log(queryString);
      connection.query(queryString, vals, function(err, result) {
        if (err) throw err;
        console.log(result);
        cb(result);
      });
    },
    updateOne: function(tableInput, objColVals, condition, cb){
      console.log("I am in the update function------orm.js");
      console.log(condition);
      var queryString = "UPDATE " + tableInput + " SET ";
      queryString += objToSql(objColVals);
      queryString += " WHERE ";
      queryString += condition;
      console.log(queryString);
  
  
         
      connection.query(queryString, function(err, result) {
          if (err) throw err;
          console.log(result);
          cb(result);
        }
      );
    }
  
};
  
  module.exports = orm;