const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  user:{type:ObjectId, require: true, unique: true},
  courseLogo:{type:Buffer, require: true, unique: true},
  courseName:{type:String, require: true, unique: true},
  courseID:{type:String, require: true, unique: true},
  department:{type:String, require: true },
  year:{type:String, require: true },
});

module.exports = mongoose.model('CourseInfo', courseSchema);