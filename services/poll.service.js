// Gettign the Newly created Mongoose Model we just created 

var Poll = require('../models/poll.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the movie List

exports.getPolls = async function(query, page, limit){

    // Options setup for the mongoose paginate

    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var polls = await Poll.paginate(query, options)
        
        // Return the movie list that was retured by the mongoose promise

        return polls;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating Polls')
    }
}

exports.createPoll = async function(poll){
    
    // Creating a new Mongoose Object by using the new keyword

    var newPoll = new Poll({
        movies: poll.movies
    })

    try{

        // Saving the Todo 

        var savedPoll = await newPoll.save()

        return savedPoll;
    }catch(e){
      
        // return a Error message describing the reason     

        throw Error("Error while Creating Poll")
    }
}

exports.updatePoll = async function(poll){
    var id = poll._id

    try{
        //Find the old Todo Object by the Id
    
        var oldPoll = await Poll.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Poll")
    }

    // If no old Poll Object exists return false

    if(!oldPoll){
        return false;
    }

    console.log(oldPoll)

    //Edit the Todo Object

    oldPoll.movies = poll.movies


    console.log(oldPoll)

    try{
        var savedPoll = await oldPoll.save()
        return savedPoll;
    }catch(e){
        throw Error("Error occured while updating the Poll");
    }
}

exports.deletePoll = async function(id){
    
    // Delete the Todo

    try{
        var deleted = await Poll.remove({_id: id})
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Poll")
    }
}

exports.addMovie = async function(id, movie){
    try{
        //Find the existing poll by id
        var poll = await Poll.findById(id);
    }catch(e){
        throw Error("Error occured while Finding the Poll")
    }

    poll.movies.push(movie);

    try{
        var savedPoll = await poll.save()
        return savedPoll;
    }catch(e){
        throw Error("Error occured while adding the movie");
    }
}