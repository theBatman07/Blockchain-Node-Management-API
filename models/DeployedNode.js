const mongoose = require('mongoose');

const DeployedNodeSchema = new mongoose.Schema({
  consumer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  node: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node',
    required: true
  },
  machine: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Machine',
    required: true
  },
  deployedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('DeployedNode', DeployedNodeSchema);