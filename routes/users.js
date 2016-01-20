function getUserRouter(collection) {
  collection = collection || 'Meal';
  const Meals = require('../models/meals')(collection);
  var router = {};

  router.welcome = function *() {
    this.render('index', {} );
  };

  router.getLogs = function *() {
    var meals = yield Meals.find().select('date breakfast lunch dinner');
    this.render('create', {meals} );
  };

  router.newLog = function *() {
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

  router.getDate = function *() {
    var meals = yield Meals.find({date: this.params.date}).select('date breakfast lunch dinner');
    this.render( 'create', {meals} );
  };

  router.deleteDate = function *() {
    var deleted = yield Meals.findOneAndRemove({date: this.params.date}).select('date breakfast lunch dinner');
    this.render( 'create', {deleted} );
  };
  return router;
}

module.exports = getUserRouter;
