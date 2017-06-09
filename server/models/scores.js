var mongoose = require('mongoose');

var scoreSchema = mongoose.Schema({
    userId: String,
    scores: Object,
});

var Score = mongoose.model('Score', scoreSchema);
module.exports = Score;