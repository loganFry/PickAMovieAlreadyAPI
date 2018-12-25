var express = require('express')

var router = express.Router()
var movies = require('./api/movies.route')


router.use('/movies', movies);


module.exports = router;