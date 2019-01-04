var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var MovieSchema = new mongoose.Schema({
    id: Number,
    title: String,
    poster_path: String,
    overview: String,
    release_date: String,
    votes: Number,
    vote_average: Number
})

var PollSchema = new mongoose.Schema({
    movies: [MovieSchema]
})

PollSchema.plugin(mongoosePaginate)
const Poll = mongoose.model('Poll', PollSchema)

module.exports = Poll;