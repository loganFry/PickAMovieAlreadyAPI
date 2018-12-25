var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var MovieSchema = new mongoose.Schema({
    mdb_id: String,
    title: String,
    poster_path: String,
    overview: String,
    release_date: String,
    votes: Number
})

MovieSchema.plugin(mongoosePaginate)
const Movie = mongoose.model('Movie', MovieSchema)

module.exports = Movie;