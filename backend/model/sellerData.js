const mongoose = require("mongoose");
const sellerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, default: "seller" },
  storeName: String,
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

module.exports = mongoose.model("Seller", sellerSchema);
