const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const meals = new Schema({
  breakfast: String,
  lunch: String,
  dinner: String,
  date: String
});

module.exports = mongoose.model('Meals', meals);
