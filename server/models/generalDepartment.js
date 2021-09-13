const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeneralDepartmentSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("GeneralDepartment", GeneralDepartmentSchema);
