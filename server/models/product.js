const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: String,
  department: String,
  image: String,
  price: String,
  quantity: Number,
  description: String,
  brand: String,
  subDepartmentId: String,
});

module.exports = mongoose.model("Product", ProductSchema);
