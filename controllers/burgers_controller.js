var express = require("express");
var router = express.Router();
// Requiring our model
var db = require("../models");

//Import the model (burger.js) to use its database functions.
//var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    db.burger.findAll({})
      .then(function(dbBurger) {
        //res.json(dbBurger);
        console.log(dbBurger);
        var hbsObject = {
          burgers: dbBurger
        }
        res.render("index", hbsObject);
      });
  });

  //ISSUES WITH PAGE RELOAD COMES FROM THIS ROUTE(POST) SINCE CONSOLE.LOGS() AREN'T DISPLAYING............
  router.post("/api/burgers", function(req, res) {
    var devouredParsed = JSON.parse(req.body.devoured);
    console.log(req.body);
    db.burger.create({
      burger_name: req.body.name,
      devoured: devouredParsed,
    })
      .then(function(dbBurger) {
        //res.json({ id: result.insertId })
        res.json(dbBurger);
      });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
    console.log(req.params);
    db.burger.update({
      devoured: JSON.parse(req.body.devoured)
    },
      {
        where: {
          id: req.params.id
        }
      })
      .then(function(dbBurger) {
        console.log("Update request  was made succesfully")
        res.status(200).end();
        res.json(dbBurger);
      });
  });
  
  module.exports = router;














// Export routes for server.js to use.
module.exports = router;
