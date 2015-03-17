var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Schema definition for users
var userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,
  username: String,
  name: {
    first: String,
    last: String
  },
  role: String,

  courses: [{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }],
  notifications: [{
    title: String,
    url: String,
    date: Date
  }],
  bookmarks: [{
    title: String,
    url: String
  }]
});

userSchema.statics.getBookmarksById = function(id, callback) {
  this.findById(id, function(err, user) {
    if (err) {
      callback(err);
    }
    else if (!user) {
      callback("userID does not exist.");
    }
    else {
      callback(undefined, user.bookmarks);
    }
  });
};
userSchema.statics.getCoursesById = function(id, callback) {
  this.findById(id, function(err, user) {
    if (err) {
      callback(err, undefined);
      return;
    }
    else if (!user) {
      callback("userID does not exist.", undefined);
      return;
    }
    else {
      user.populate('courses', function (err, user) {
        var courses = [];
        for (i in user.courses) {
          courses.push(user.course);
        }
        callback(undefined, courses);
      })
    }
  });

};
userSchema.statics.getNotificationsById = function(id, callback) {
  this.findById(id, function(err, user) {
    if (err) {
      callback(err);
    }
    else if (!user) {
      callback("userID does not exist.");
    }
    else {
      callback(undefined, user.notifications);
    }
  });
};
userSchema.statics.getUserRoleById = function(id, callback) {
  this.findById(id, function(err, user) {
    if (err) {
      callback(err);
    }
    else if (!user) {
      callback('userID does not exist.');
    }
    else {
      callback(undefined, user.role);
    }
  })
};

var Course = require('./courses.js').Course;
var User = mongoose.model('User', userSchema);

exports.User = User;

