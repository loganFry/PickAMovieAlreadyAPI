var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(process.env.CLIENT_LOCATION);
});

module.exports = router;
