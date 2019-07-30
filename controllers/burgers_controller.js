var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    burger.selectAll(function(data) {
      var hbsObject = {
        burgers: data
      };
      console.log(hbsObject);
      res.render("index", hbsObject);
    });
  });

  //ISSUES WITH PAGE RELOAD COMES FROM THIS ROUTE(POST) SINCE CONSOLE.LOGS() AREN'T DISPLAYING............
  router.post("/api/burgers", function(req, res) {
    var devouredParsed = JSON.parse(req.body.devoured);
    burger.insertOne(["burger_name", "devoured"], [req.body.name, devouredParsed], function(result) {
      // Send back the ID of the new quote
      console.log("New burger was successfully created");
      console.log("Here is the result id: " + result.insertId);
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    console.log("condition", condition);
    console.log(req.params);
  
    burger.updateOne(
      {
        devoured: JSON.parse(req.body.devoured)
      },
      condition,
      function(result) {
        if (result.changedRows === 0) {
          // If no rows were changed, then the ID must not exist, so 404
          return res.status(404).end();
        }
        console.log("Update request  was made succesfully")
        res.status(200).end();
  
      }
    );
  });
  














// Export routes for server.js to use.
module.exports = router;
