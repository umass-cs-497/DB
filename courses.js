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
  // list of references to lectures, elements should be ObjectIds in Lecture collection.
  lectures: [{
    type: Schema.Types.ObjectId,
    ref: 'Lecture'
  }],
  // list of references to registered students/instructors, elements should be ObjectIds in User collection.
  registeredUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  // list of all eligible emails to view the course's material (different from registeredUsers above.)
  emails: [String],
  semester: String,
  title: String
});

/*
  Methods to work with Course database.
  callback should be in the form function (err, data).
 */

courseSchema.statics.getCourseById = function(id, callback) {
  this.findById(id, function(err, course) {
    if (err) {
      callback(err);
    }
    else if (!course) {
      callback("courseID does not exist");
    }
    else {
      callback(undefined, course);
    }
  });
};
courseSchema.statics.getRegisteredUsersById = function(id, callback) {
  this.findById(id)
      .populate('registeredUsers')
      .exec(function(err, course) {
        if (err)
          callback(err);
        else if (!course)
          callback('courseID does not exist.');
        else
          callback(undefined, course.registeredUsers);
      })
};
courseSchema.statics.getAllUserEmailsById = function(id, callback) {
  this.findById(id, function(err, course) {
    if (err) {
      callback(err);
    }
    else if (!course) {
      callback("courseID does not exist");
    }
    else {
      callback(undefined, course.emails);
    }
  });
};

var Course = mongoose.model('Course', courseSchema);

exports.Course = Course;
