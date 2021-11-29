const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let activitySchema = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  startTime: {
    type: String
  },
  endTime: {
    type: String
  },
  date: {
    type: Date
  },
  color: {
    type: String
  },
  userId: {
    type: String
  }
}, {
  collection: 'activities'
})

module.exports = mongoose.model('Activity', activitySchema)