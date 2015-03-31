
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var bodyParser  = require('body-parser');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
//app.get('/events', routes.events);

var userdata = require('./routes/users');
app.get('/viewAllUsers', userdata.findAll);
app.get('/addUsers', userdata.addUsers);
app.post('/addUsers', userdata.addUsers);
app.post('/viewAllUsers', userdata.removeById);


// var carResource = require('./routes/cars');
// app.get('/cars', carResource.findAll);
// app.get('/cars/:id', carResource.findById);
// app.post('/cars', carResource.create);
// //app.delete('/cars/:id', carResource.removeById);
// app.put('/cars/:id', carResource.update);



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
