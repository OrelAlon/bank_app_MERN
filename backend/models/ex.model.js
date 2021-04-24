const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exSchema = new Schema(
  {
    username: { type: String, required: true, minlength: 3 },
    cash: {
      type: Number,
      default: 0,
    },

    credit: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Ex = mongoose.model('Ex', exSchema);

module.exports = Ex;
