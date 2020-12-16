const express = require("express");
const router = express.Router();

const Item = require("../models/Item");

/* GET home page. */
router.get("/", function (req, res, next) {
  Item.find({}, (err, items) => {
    if (err) {
      console.log(err);
    } else {
      res.render("app", { items: items });
    }
  });
});

module.exports = router;
