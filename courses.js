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
  // list of registered students/instructors.
  registeredUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  // list of all eligible emails to view the course's material.
  emails: [String],
  semester: String,
  title: String
});

var User = require('./users.js').User;
var Lecture = require('./lectures.js').Lecture;
var Course = mongoose.model('Course', courseSchema);

exports.Course = Course;
