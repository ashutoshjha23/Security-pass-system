const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  visitType: String,
  token: String,  
  timeOut: Date,
  inductionCompleted: Boolean,
  timeIn: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Visitor', VisitorSchema);
