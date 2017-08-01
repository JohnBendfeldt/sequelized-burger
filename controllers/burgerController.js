var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var db = require("../models");
db.sequelize.sync();

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  db.Burger.findAll({
    order: [['burger_name', 'ASC']]
  }).then(function(results) { 
    var hbsObject = {
        burgers: results
      };
      res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
    console.log("Burger Data:");
    console.log(req.body);
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
    }).then(function(results) {
        res.redirect("/");
    })
});

router.put("/:id", function(req, res) {
  db.Burger.update({
      burger_name: req.body.burger_name,
      devoured: req.body.devoured
   }, {where: {
        id: req.params.id
      }}).then(function(results) {
        res.redirect("/");
  });
});

router.delete("/:id", function(req, res) {
    console.log("Burger Data:");
    console.log(req.body);
    db.Burger.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(results) {
        res.redirect("/");
    })
});

// Export routes for server.js to use.
module.exports = router;
