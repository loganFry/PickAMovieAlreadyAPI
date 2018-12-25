var express = require('express')

var router = express.Router()
var movies = require('./api/movies.route')
var polls = require('./api/polls.route')


router.use('/movies', movies);
router.use('/polls', polls)


module.exports = router;