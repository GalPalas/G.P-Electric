const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubDepartmentSchema = new Schema({
  name: String,
  departmentId: String,
});

module.exports = mongoose.model("SubDepartment", SubDepartmentSchema);
