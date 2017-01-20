var express = require('express');
var router = express.Router();

// console.log(__dirname);

/* GET home page. */
router.get('*', function (req, res) {
  console.log("home page: " + __dirname + '/index.html');
  res.sendFile(__dirname + '/index.html');
});

module.exports = router;
