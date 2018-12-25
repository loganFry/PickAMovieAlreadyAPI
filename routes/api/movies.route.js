var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var MovieController = require('../../controllers/movies.controller');


// Map each API to the Controller FUnctions

router.get('/', MovieController.getMovies)

router.post('/', MovieController.createMovie)

//router.put('/', MovieController.updateTodo)

router.delete('/:id', MovieController.removeMovie)


// Export the Router

module.exports = router;