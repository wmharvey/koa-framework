const Meals = require('../models/meals');

exports.welcome = function *() {
  this.render('index', {} );
};

exports.getLogs = function *() {
  var meals = yield Meals.find().select('date breakfast lunch dinner');
  this.render('create', {meals} );
};

exports.newLog = function *() {
  var added = yield new Meals({
    breakfast: this.request.body.breakfast,
    lunch: this.request.body.lunch,
    dinner: this.request.body.dinner,
    date: this.request.body.date
  }).save( (err, myMeals) => {
    if (err) throw err;
  });
  this.render('create', {added} );
};

exports.getDate = function *() {
  var meals = yield Meals.find({date: this.params.date}).select('date breakfast lunch dinner');
  this.render( 'create', {meals} );
};

exports.deleteDate = function *() {
  var deleted = yield Meals.findOneAndRemove({date: this.params.date}).select('date breakfast lunch dinner');
  this.render( 'create', {deleted} );
};
