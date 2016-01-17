// export this module, so that it is accessible to our application modules
module.exports = events;
 
// Events constructor
function events() {
        if (!(this instanceof events)) {
                return new events();
        }
 
        // require mongodb
        var mongo = require('mongodb');
        
        // Connect to our mongodb running on localhost and named 'Throng'
        var monk = require('monk');
        var db = monk('localhost:27017/Throng');
        //var db = monk('cloud9:gWdfGq7GzwB9vf@ds059471.mongolab.com:59471/throng');
        
        // obtain a reference to our user collection within mongodb
        this.events = db.get('eventcollection');
};
 
// Retrieve a list of all persisted
events.prototype.findAll = function(success, error) {
    this.events.find({},{},response(success, error));
};
 
// Retrieve an event by its id
events.prototype.findById = function(id, success, error) {
        this.events.findById(id, response(success,error));
};

 
// Persist a new event document to mongodb
events.prototype.addEvents = function(event, success, error) {
        this.events.insert(event, response(success,error));
};
 
// Update an existing event document by id in mongodb
events.prototype.update = function(resources, success, error) 
{
 if (resources.ids.length != 0)
 {
        for (var i=0;i<resources.ids.length;i++)
        {
                this.events.findAndModify(
                        { _id:resources.eventID },
                        { $addToSet: { guests: this.events.id(resources.ids[i].value)} },
                        response(success, error) );
        }
 }
};
 
// Remove an event by id from the mongodb
events.prototype.removeById = function(ids, success, error) {
        
        for (var i=0;i<ids.length; i++){
                this.events.removeById(ids[i], response(success, error));        
        }
};

events.prototype.removeGuest = function(data, success, error) {
        
                this.events.findAndModify(
                        { _id:data.eventID },
                        { update:{ pull: { guests: data.guestID } }},
                        response(success, error) );       
};
 
// Callback to the supplied success and error functions
// The caller will supply this function. The callers implementation
// will provide the necessary logic. In the case of the sample app,
// the caller's implementation will send an appropriate http response.
var response = function(success, error) {
        return function(err, doc) {
                if (err) {
                        // an error occurred, call the supplied error function
                        error(err);
                } else {
                        // call the supplied success function
                        success(doc);
                }
        };
};
