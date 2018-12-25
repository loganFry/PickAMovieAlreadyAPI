// Gettign the Newly created Mongoose Model we just created 

var Movie = require('../models/movie.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the movie List

exports.getMovies = async function(query, page, limit){

    // Options setup for the mongoose paginate

    var options = {
        page,
        limit
    }
    
    // Try Catch the awaited promise to handle the error 
    
    try {
        var movies = await Movie.paginate(query, options)
        
        // Return the movie list that was retured by the mongoose promise

        return movies;

    } catch (e) {

        // return a Error message describing the reason 

        throw Error('Error while Paginating Movies')
    }
}

exports.createMovie = async function(movie){
    
    // Creating a new Mongoose Object by using the new keyword

    var newMovie = new Movie({
        mdb_id: movie.mdb_id,
        title: movie.title,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        votes: movie.votes
    })

    try{

        // Saving the Todo 

        var savedMovie = await newMovie.save()

        return savedMovie;
    }catch(e){
      
        // return a Error message describing the reason     

        throw Error("Error while Creating Movie")
    }
}

// exports.updateTodo = async function(todo){
//     var id = todo.id

//     try{
//         //Find the old Todo Object by the Id
    
//         var oldTodo = await Movie.findById(id);
//     }catch(e){
//         throw Error("Error occured while Finding the Todo")
//     }

//     // If no old Todo Object exists return false

//     if(!oldTodo){
//         return false;
//     }

//     console.log(oldTodo)

//     //Edit the Todo Object

//     oldTodo.title = todo.title
//     oldTodo.description = todo.description
//     oldTodo.status = todo.status


//     console.log(oldTodo)

//     try{
//         var savedTodo = await oldTodo.save()
//         return savedTodo;
//     }catch(e){
//         throw Error("And Error occured while updating the Todo");
//     }
// }

exports.deleteMovie = async function(id){
    
    // Delete the Todo

    try{
        var deleted = await Movie.remove({_id: id})
        return deleted
    }catch(e){
        throw Error("Error Occured while Deleting the Movie")
    }
}