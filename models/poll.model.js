var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')
var Movie = require('./movie.model')


var PollSchema = new mongoose.Schema({
    movies: [Movie]
})

PollSchema.plugin(mongoosePaginate)
const Poll = mongoose.model('Poll', PollSchema)

module.exports = Poll;