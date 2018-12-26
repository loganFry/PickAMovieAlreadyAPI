var express = require('express')

var router = express.Router()

// Getting the Todo Controller that we just created

var PollController = require('../../controllers/polls.controller');


// Map each API to the Controller FUnctions

router.get('/', PollController.getPolls)

router.get('/:id', PollController.getPoll)

router.post('/', PollController.createPoll)

router.put('/', PollController.updatePoll)

router.put('/:id/addMovie', PollController.addMovie)

router.put('/:id/removeMovie', PollController.removeMovie)

router.delete('/:id', PollController.removePoll)


// Export the Router

module.exports = router;