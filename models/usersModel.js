// export this module, so that it is accessible to our application modules
module.exports = users;
 
// Cars constructor
function users() {
        if (!(this instanceof users)) {
                return new users();
        }
 
        // require mongodb
        var mongo = require('mongodb');
        // Connect to our mongodb running on localhost and named 'Throng'
        var monk = require('monk');
        var db = monk('localhost:27017/Throng');
        //var db = monk('cloud9:gWdfGq7GzwB9vf@ds059471.mongolab.com:59471/throng');
        // obtain a reference to our user collection within mongodb
        this.users = db.get('usercollection');
};
 
// Retrieve a list of all persisted
users.prototype.findAll = function(success, error) {
    this.users.find({},{},response(success, error));
};
 
// // Retrieve a car by its id
// users.prototype.findById = function(id, success, error) {
//         this.users.findById(id, response(success,error));
// };
 
// Persist a new car document to mongodb
users.prototype.addUsers = function(user, success, error) {
        this.users.insert(user, response(success,error));
};
 
// // Update an existing car document by id in mongodb
// Cars.prototype.update = function(car, success, error) {
//         this.cars.findAndModify(car._id,
//                 { $set: { name: car.name } }, response(success, error));
// };
 
// Remove a car by id from the mongodb
users.prototype.removeById = function(ids, success, error) {
        
        for (var i=0;i<ids.length; i++){
                this.users.removeById(ids[i], response(success, error));        
        }
        
        
};

users.prototype.findGuests = function(Resource, success, error) {
                if(Resource != null){
                        if(Resource.guests != null){
                                this.users.find({_id: { $in : Resource.guests } }, response(success,error));
                        }
                        else response(success(null), error)
                }
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
