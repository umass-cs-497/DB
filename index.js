var mongoose = require('mongoose');
mongoose.connect('mongodb://freddy:freddy@ds043170.mongolab.com:43170/learn_u');

var User = require('./users.js').User;
var Course = require('./courses.js').Course;
var Lecture = require('./lectures.js').Lecture;
var Comment = require('./comments.js').Comment;

var enroll = function(userId, courseId, callback) {
  Course.findById(courseId, function(err, course) {
    if (err)
      callback(err);
    else if (!course)
      callback("courseID does not exist");
    else {
      User.findById(userId, function(err, user) {
        if (err)
          callback(err);
        else if (!user)
          callback("userID does not exist");
        else {
          User.addCourseByEmail(user.email, courseId, function() {});
          Course.addUserById(courseId, userId, function() {});
          callback(undefined, "success.");
        }
      });
    }
  });
};

module.exports = {
  enroll: enroll,
  users: User,
  courses: Course,
  lectures: Lecture,
  comments: Comment
};
