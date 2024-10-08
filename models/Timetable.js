const mongoose = require('mongoose');

const timeTableSchema = new mongoose.Schema({
  day: { type: String, required: true },
  subject: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
});

module.exports = mongoose.model('TimeTable', timeTableSchema);