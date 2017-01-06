// var cors = require('cors');
var dbs = require('../lib/service')();

var express = require('express');
var api = express.Router();

// api.use(cors());

api.use(function(req,res,next){
    next();
});

api.get('/api', function(req,res){
    res.send('Welcome to API');
});

api.get('/api/scores', function(req, res){
    dbs.get(req.session.passport.user, function(scores){
        res.send(scores);
    });
});

api.post('/api/scores', function(req, res){
    console.log("date: " + req.body.date);
    var body = {
        date : req.body.date,
        epoch : new Date(req.body.date).getTime(),
        score: req.body.score,
        comment: req.body.comment,
    };

    //need to add check for if user if authenticated
    // console.log(req.session.passport.user);
    var id = req.session.passport.user;
    //send it to the DB
    dbs.update(id, body);
});

api.post('/api/delete', function(req, res){
    var id = req.session.passport.user;

    dbs.delete(id, 'temp');
});

module.exports = api;

