const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  requiredCpu: {
    type: String,
    required: true
  },
  requiredRam: {
    type: String,
    required: true
  },
  requiredStorage: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Node', NodeSchema);