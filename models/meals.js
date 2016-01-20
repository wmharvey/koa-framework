const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function getMealSchema (collection) {
  const meals = new Schema({
    breakfast: String,
    lunch: String,
    dinner: String,
    date: String
  });
  return mongoose.model(collection, meals);
}

module.exports = getMealSchema;
