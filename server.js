const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const koaBody = require('koa-body')({multipart: true});
const Jade = require('koa-jade');
const jade = new Jade({
  viewPath: './public/views',
  noCache: true,
  app: app
});

module.exports = function(collection) {
  const user = require('./routes/users')(collection);
  var mongoose = require('mongoose');
  mongoose.connect('mongodb://localhost/meals');
  var db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));

  app.use(require('koa-static')(__dirname + '/public'));

  router.get('/', user.welcome);
  router.get('/welcome', user.welcome);
  router.get('/logs', user.getLogs);
  router.post('/logs', koaBody, user.newLog);
  router.get('/logs/:date', user.getDate);
  router.delete('/logs/:date', user.deleteDate);

  app
    .use( router.routes() )
    .use( router.allowedMethods() );

  return app;
};
