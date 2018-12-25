// Accessing the Service that we just created

var PollService = require('../services/poll.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the Polls

exports.getPolls = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var polls = await PollService.getPolls({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: polls, message: "Succesfully Polls Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createPoll = async function(req, res, next){

    // Req.Body contains the form submit values.
    var poll = {
        movies: req.body.movies
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        console.log('poll to be created: ')
        console.log(poll)
        var createdPoll = await PollService.createPoll(poll)
        return res.status(201).json({status: 201, data: createdPoll, message: "Succesfully Created Poll"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Poll Creation was Unsuccesfull"})
    }
}

exports.updatePoll = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    console.log(req.body)

    var poll = {
        _id: req.body._id,
        movies: req.body.movies ? req.body.movies : null
    }

    try{
        var updatedPoll = await PollService.updatePoll(poll)
        return res.status(200).json({status: 200, data: updatedPoll, message: "Succesfully Updated Poll"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removePoll = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await PollService.deletePoll(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted Poll"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}