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

/*
  Method to add user to course.
 */
courseSchema.statics.addUserById = function(courseId, userId, callback) {
  this.findById(courseId, function(err, course) {
    if (err) {
      callback(err);
    }
    else if (!course) {
      callback("courseID does not exist");
    }
    else {
      course.registeredUsers.push(userId);
      callback(undefined, course);
    }
  })
};

/*
  Method to create a course given basic info: semester, department (e.g, CMPSCI), course number(e.g, 497S).
 */
courseSchema.statics.createCourse = function(semester, department, courseNumber, callback) {
  var courseModel = this;
  courseModel.find({
    semester: semester,
    department: department,
    courseNumber: courseNumber
  }, function(err, course) {
    if (err) {
      callback(err);
    }
    else {
      courseModel.create({
        courseNumber: courseNumber,
        department: department,
        semester: semester
      }, callback);
    }
  })
};

/*
  Method to get course by courseId.
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

/*
  Method to get all registered accounts by courseId.
 */
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

/*
  Method to get all eligible user emails by courseId.
 */
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

/*
 *
 */
courseSchema.statics.dropCoursesDatabase = function(callback) {
  this.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log("Course database dropped");
    }
    callback();
  });
};
};

var Course = mongoose.model('Course', courseSchema);

exports.Course = Course;
