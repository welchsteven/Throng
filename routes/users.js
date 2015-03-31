var users = require('../models/usersModel')();

exports.findAll = function(req, res) {
        
        var ok = function(userResources, error) {

                res.render('viewAllUsers', {
                        title: 'User Management',
                        allUsers: userResources
                });
        };

        var err = function(err) {
                res.send(404);
        };
        users.findAll(ok, err);
};

// exports.findById = function(req, res) {
//         var ok = function(doc) {
//                 res.json(doc);
//         };
//         var err = function(err) {
//                 res.send(404);
//         };
//         cars.findById(req.params.id, ok, err);
// };

exports.addUsers = function(req, res) {
        var ok = function(doc) {
                res.render('addUsers', {
                        title: 'User Management'
                });
        };
        var err = function(err) {
                res.send(409, "Failed to create user");
        };
        if (req.method == "GET") {
                res.render('addUsers', {
                        title: 'User Management'
                });

        }
        else if (req.method == "POST") {
                users.addUsers(req.body, ok, err);
        }
};

// exports.update = function(req, res) {
//         if (!req.body._id) {
//                 res.send(404, "id required");
//         } else {
//                 var ok = function(doc) {
//                         res.send(200);
//                 };
//                 var err = function(err) {
//                         res.send(409, "update failed");
//                 };
//                 cars.update(req.body, ok, err);
//         }
// };

exports.removeById = function(req, res) {
        var i=0;
        
        var ok = function(doc) {
                
                // i++; 
                // if (i==doc)
                // {
                       // res.redirect('/viewAllusers');
                // }

        };
        
        var err = function(err) {
                res.send(409, "Failed to remove user");
        };
        //users.removeById(req.body.ids, ok(req.body.ids.length), err);
        users.removeById(req.body.ids, ok, err);
        res.redirect('/viewAllusers');
};