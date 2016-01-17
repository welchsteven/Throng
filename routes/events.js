var events = require('../models/eventsModel')();
var users = require('../models/usersModel')();
var async = require("async");


exports.findAll = function(req, res) {

        var ok = function(eventResources, error) {

                res.render('viewAllEvents', {
                        title: 'Event Management',
                        allEvents: eventResources
                });
        };

        var err = function(err) {
                res.send(404);
        };
        events.findAll(ok, err);
};

exports.addEvents = function(req, res) {
        var ok = function(doc) {
                res.render('addEvents', {
                        title: 'Event Management'
                });
        };
        var err = function(err) {
                res.send(409, "Failed to create event");
        };
        if (req.method == "GET") {
                res.render('addEvents', {
                        title: 'Event Management'
                });

        }
        else if (req.method == "POST") {
                events.addEvents(req.body, ok, err);
        }
};

exports.update = function(req, res) {
        if (!req.body.eventID) {
                res.send(404, "Event ID required");
        }
        else if (!req.body.ids) {
                res.render("guests.jade");
        }
        else {
                var ok = function(doc) {

                        res.render("guests.jade");
                };

                var err = function(err) {
                        res.send(409, "update failed");
                };
                events.update(req.body, ok, err);
        }
};

exports.removeById = function(req, res) {
        var i = 0;

        var ok = function(doc) {

        };

        var err = function(err) {
                res.send(409, "Failed to remove event");
        };
        events.removeById(req.body.ids, ok, err);
        res.redirect('/viewAllEvents');
};

exports.removeGuest = function(req, res) {

        var ok = function(doc) {
                res.render("guests.jade");
        };

        var err = function(err) {
                res.send(409, "Failed to remove guest");
        };
        events.removeGuest(req.body, ok, err);
};

exports.findById = function(req, res) {
        var resources = new Object();
        resources.title = 'Event Management';
        async.series([
                        function(callback) {
                                var ok = function(Resource) {
                                        if (typeof(Resource.EventName) != 'undefined') {
                                                resources.event = Resource;
                                        }
                                        callback(null,null);
                                };

                                events.findById(req.query.eventID, ok, function(err) {
                                        res.send(404);
                                        callback(null,null);
                                });

                        },
                        function(callback) {
                                var ok = function(Resource) {
                                        resources.guests = Resource;

                                        
                                        callback(null,null);
                                };
                                var err = function(err) {
                                        callback(1,null);
                                }
                                users.findGuests(resources.event, ok, err);

                        },
                        function(callback) {
                                var ok = function(Resource) {
                                        resources.users = Resource;
                                        callback(null,null);
                                };
                                
                                users.findAll(ok, function(err) {
                                        res.send(404);
                                        callback(null,null);
                                });
                        }
                ],
                // optional callback 
                function(err, results) {
                        if (err) {
                                res.send(404);
                        }
                        else {
                                res.render('editEvent', resources);
                        }

                });



};