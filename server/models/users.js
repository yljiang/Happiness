var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    authId: String,
    name: String,
    email: String,
    scores: Array,
    created: Date,
});

var User = mongoose.model('User', userSchema);

module.exports = User;