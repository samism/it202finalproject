var express = require('express');
var router = express.Router();

// console.log(__dirname);

/* GET home page. */
router.get('*', function (req, res) {
  var homepath = __dirname.slice(0, __dirname.indexOf("it202finalproject") + 17) + "/app";
  console.log("home page: " + homepath);
  res.sendFile(homepath + '/index.html');
});

module.exports = router;
