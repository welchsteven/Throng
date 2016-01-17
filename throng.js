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

var userData = require('./routes/users');
app.get('/viewAllUsers', userData.findAll);
app.get('/addUsers', userData.addUsers);
app.post('/addUsers', userData.addUsers);
app.post('/viewAllUsers', userData.removeById);

var eventData = require('./routes/events');
app.get('/viewAllEvents', eventData.findAll);
app.post('/viewAllEvents', eventData.removeById);

app.get('/addEvents', eventData.addEvents);
app.post('/addEvents', eventData.addEvents);

app.get('/editEvent', eventData.findById);
app.post('/editEvent', eventData.update);
app.delete('/editEvent', eventData.removeGuest);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});