const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  name: String,
  generalDepartmentId: String,
});

module.exports = mongoose.model("Department", DepartmentSchema);
