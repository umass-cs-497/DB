var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Schema definition for courses
var courseSchema = new Schema({
  courseNumber: String,
  courseSection: String,
  department: String,
  description: String,
  permission: Number,
  instructors: [{
    type: String,
    unique: true
  }],
  lectures: [{
    type: Schema.Types.ObjectId,
    ref: 'Lecture'
  }],
  registeredUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  emails: [String],
  semester: String,
  title: String
});

var User = require('./users.js').User;
var Lecture = require('./lectures.js').Lecture;
var Course = mongoose.model('Course', courseSchema);

exports.Course = Course;
