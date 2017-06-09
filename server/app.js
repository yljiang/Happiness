var express = require('express');
var routes = require('./routes/routes');
var api = require('./routes/api');
var credentials = require('./config/credentials.js');
var handlebars = require('express-handlebars');

var app = module.exports = express();
var env = app.get('env');


app.engine('handlebars', handlebars({defaultLayout: 'mainLayout'}));
app.set('view engine', 'handlebars');

app.use(require('cookie-parser')());
app.use(require('body-parser').json());
app.use(require('body-parser').urlencoded({ extended: true }));

//////////////////////////////////
////////Configure MONGO DB
///////////////////////////////////
var mongoose = require('mongoose');
var opts = {
    server: {
        socketOption:{keepAlive: 1}
    }
};

var DBURL = credentials.mongo.connectionString;
var User = require('./models/users');

switch(env){
    case 'development':
        mongoose.connect(DBURL, opts);
        break;
    case 'production':
        mongoose.connect(DBURL, opts);
        break;
    default:
        throw new Error('Unknown executions enviroment: ' + env);
}

//////////////////////////////////
// MONGO FOR SESSION Storage
///////////////////////////////////
var MongoSessionStore = require('session-mongoose')(require('connect')); 
var sessionStore = new MongoSessionStore({ url:
        credentials.mongo.connectionString });

app.use(require('cookie-parser')(credentials.cookieSecret));
app.use(require('express-session')({
    resave: false,
    saveUninitialized: false,
    secret: credentials.cookieSecret,
    store: sessionStore,
    cookie:{
        maxAge:600000,
    }
}));
// app.use(require('csurf')());
// app.use(function(req, res, next) {
//     res.locals._csrfToken = req.csrfToken();
//     next();
// });

//////////////////////////////////
////////Authentications
///////////////////////////////////
var auth = require('./services/auth.js')(app, {
    providers:credentials.authProviders,
    successRedirect: '/dashboard',
    failtureRedirect: '/unauthorized',
});
console.log(auth);

auth.init();
auth.registerRoutes();

//Routing
app.use(routes);


// require('./models/rawdata');


//Env Setup
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
 

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


