// Accessing the Service that we just created

var MovieService = require('../services/movie.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the To do List

exports.getMovies = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var movies = await MovieService.getMovies({}, page, limit)
        
        // Return the todos list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: movies, message: "Succesfully Movies Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createMovie = async function(req, res, next){

    // Req.Body contains the form submit values.
    var movie = {
        mdb_id: req.body.id,
        title: req.body.title,
        poster_path: req.body.poster_path,
        overview: req.body.overview,
        release_date: req.body.release_date,
        votes: req.body.votes
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdMovie = await MovieService.createMovie(movie)
        return res.status(201).json({status: 201, data: createdMovie, message: "Succesfully Created Movie"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Movie Creation was Unsuccesfull"})
    }
}

// exports.updateTodo = async function(req, res, next){

//     // Id is necessary for the update

//     if(!req.body._id){
//         return res.status(400).json({status: 400., message: "Id must be present"})
//     }

//     var id = req.body._id;

//     console.log(req.body)

//     var todo = {
//         id,
//         title: req.body.title ? req.body.title : null,
//         description: req.body.description ? req.body.description : null,
//         status: req.body.status ? req.body.status : null
//     }

//     try{
//         var updatedTodo = await MovieService.updateTodo(todo)
//         return res.status(200).json({status: 200, data: updatedTodo, message: "Succesfully Updated Tod"})
//     }catch(e){
//         return res.status(400).json({status: 400., message: e.message})
//     }
// }

exports.removeMovie = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await MovieService.deleteMovie(id)
        return res.status(204).json({status:204, message: "Succesfully Deleted Movie"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}