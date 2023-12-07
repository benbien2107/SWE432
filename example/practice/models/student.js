const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
 name :String, 
 gnumber: String,
 email: String,
 message: String,
});

const Student = mongoose.model("Student", studentSchema, "students");

module.exports = Student;
