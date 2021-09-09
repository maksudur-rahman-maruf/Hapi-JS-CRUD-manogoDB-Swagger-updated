const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const HistoryModel = Mongoose.model("history", {
  firstname: String,
  lastname: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = HistoryModel;