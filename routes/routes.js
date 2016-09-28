var express = require('express');
var router = express.Router();
var api = require('./api');
var dbs = require('../lib/service')();
router.use(api);

router.get('/', function(req, res){
    // console.log(req.session);
    if(!req.session || !req.session.passport)
        return res.redirect('login');
    res.redirect('/dashboard');
});

router.get('/unauthorized', function(req, res){
    res.send('404: No Permission');
});

router.get('/dashboard', function(req, res){
    // console.log(req.session);
    if(!req.session.passport.user)
        return res.render('unauthorized');

    //get Score data
    var data;
    dbs.get(req.session.passport.user, function(scores){
        data = scores;
        console.log("score: " + data);
        res.render('dashboard', {scores: data});
    });
});

router.get('/login', function(req, res){
    res.render('login');
});

// router.post('/login',
//   passport.authenticate('local', { successRedirect: '/',
//                                    failureRedirect: '/login',
//                                    failureFlash: true })
// );

module.exports = router;