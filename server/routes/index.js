var express = require('express');
var router = express.Router();

// console.log(__dirname);

/* GET home page. */
router.get('*', function (req, res) {
  res.sendFile('/Users/sameer/Desktop/reviewsystem/review_system/app/index.html');
});

module.exports = router;
