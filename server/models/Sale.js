const mongoose = require("mongoose");

const salesDataSchema = new mongoose.Schema({
  product: { type: String, unique: true },
  sales: [{ month: String, amount: Number }],
});

const SalesData = mongoose.model("SalesData", salesDataSchema);

module.exports = SalesData;
