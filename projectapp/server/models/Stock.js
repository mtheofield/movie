const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['Not In', 'In Stock', 'Finished'],
  },
  stockId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
  },
});

module.exports = mongoose.model('Stock', StockSchema);
