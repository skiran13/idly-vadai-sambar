var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var passport = require('passport');
require('./config/passport.js')(passport);
mongoose.Promise = global.Promise;
var databaseConfig = require('./config/database');
// var router = require('./app/routes');

mongoose.connect(databaseConfig.url,{ useNewUrlParser: true });



app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());


require('./app/routes/auth.js')(app);
require('./app/routes/menu')(app);
require('./app/routes/order')(app);

app.listen(process.env.PORT || 8080);
console.log("App listening on port 8080");
