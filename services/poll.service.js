// Gettign the Newly created Mongoose Model we just created 

var Poll = require('../models/poll.model')

// Saving the context of this module inside the _the variable
_this = this


exports.getPolls = async function(query, page, limit){
    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }
    
    try {
        var polls = await Poll.paginate(query, options)
        
        // Return the movie list that was retured by the mongoose promise
        return polls;
    } catch (e) {
        // return a Error message describing the reason 
        throw Error('Error while paginating polls')
    }
}

exports.getPoll = async function(id){
    try{
        //Find the existing poll by id
        var poll = await Poll.findById(id);
        return poll;
    }catch(e){
        throw Error("Error occured while finding the poll")
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
        throw Error("Error while Creating Poll")
    }
}

exports.updatePoll = async function(poll){
    var id = poll._id

    try{
        //Find the old poll by id
        var oldPoll = await Poll.findById(id);
    }catch(e){
        throw Error("Error occured while finding the poll")
    }

    // If no old Poll Object exists return false
    if(!oldPoll){
        return false;
    }

    //Edit the poll object
    oldPoll.movies = poll.movies

    try{
        var savedPoll = await oldPoll.save()
        return savedPoll;
    }catch(e){
        throw Error("Error occured while updating the poll");
    }
}

exports.deletePoll = async function(id){
    try{
        var deleted = await Poll.remove({_id: id})
        return deleted
    }catch(e){
        throw Error("Error ocurred while deleting the poll")
    }
}

exports.addMovie = async function(id, movie){
    try{
        //Find the existing poll by id
        var poll = await Poll.findById(id);
    }catch(e){
        throw Error("Error occured while finding the poll")
    }

    poll.movies.push(movie);

    try{
        var savedPoll = await poll.save()
        return savedPoll;
    }catch(e){
        throw Error("Error occured while adding the movie");
    }
}

exports.removeMovie = async function(pollId, movieId){
    try {
        var modifiedPoll = await Poll.findByIdAndUpdate(pollId, {$pull : {movies: { id: movieId }}})
        return modifiedPoll;
    } catch(e) {
        throw Error("Error ocurred while removing the movie");
    }
}

exports.voteForMovie = async function(pollId, movieId){
    try{
        //Find the old poll by id
        var oldPoll = await Poll.findById(pollId);
    }catch(e){
        throw Error("Error occured while finding the poll")
    }

    var movie = oldPoll.movies.find(x => x.id === movieId);
    console.log(movieId)
    console.log(oldPoll)
    movie.votes++;

    try {
        var savedPoll = await oldPoll.save();
        return savedPoll;
    } catch(e) {
        throw Error("Error ocurred while updating the vote count");
    }
}