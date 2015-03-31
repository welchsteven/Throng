/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Throng' });
};

exports.events = function(req, res){
  res.render('viewEvent', { title: 'Events' });
};

exports.about = function(req, res){
  res.render('about', { title: 'About' });
};
