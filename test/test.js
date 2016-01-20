var chai = require('chai');
var chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = chai.expect;
var MongoClient = require('mongodb').MongoClient;
var globalDB;

var app = require('../server')('Test');

describe('CRUD Test', () => {

  before('Clear test collection', (done) => {
    var url = 'mongodb://localhost/meals';
    MongoClient.connect(url, function(err, db) {
      db.collection('tests').deleteMany({});
      globalDB = db;
      done();
    });
  });

  after('Close DB connection', () => {
    globalDB.close();
  });

  it('should log a post request to the db', (done) => {
    chai.request( app.callback() )
      .post('/logs')
      .type('form')
      .send({breakfast:'Oatmeal'})
      .send({lunch: 'Sandwich'})
      .send({dinner: 'Steak'})
      .send({date: '2016-01-01'})
      .end(function(err, res) {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        globalDB.collection('tests').findOne({}, {fields: {_id: 0} }, function (err, res) {
          expect(res.breakfast).to.equal('Oatmeal');
          expect(res.lunch).to.equal('Sandwich');
          expect(res.dinner).to.equal('Steak');
          expect(res.date).to.equal('2016-01-01');
          done();
        });
      });
  });

  it('should return a list documents', (done) => {
    chai.request( app.callback() )
      .get('/logs')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text.toString()).to.have.string('Oatmeal');
        expect(res.text.toString()).to.have.string('Sandwich');
        expect(res.text.toString()).to.have.string('Steak');
        expect(res.text.toString()).to.have.string('2016-01-01');
        done();
      });
  });

  it('should return the contents of a queried file', (done) => {
    chai.request( app.callback() )
      .get('/logs/2016-01-01')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.text.toString()).to.have.string('Oatmeal');
        done();
      });
  });

  it('should delete a queried document from the db', (done) => {
    chai.request( app.callback() )
      .delete('/logs/2016-01-01')
      .end( (err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        globalDB.collection('tests').findOne({}, {fields: {_id: 0} }, function (err, res) {
          expect(res).to.equal(null);
          done();
        });
      });
  });
});
