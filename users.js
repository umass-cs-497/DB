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

userSchema.statics.getBookmarksByEmail = function(email, callback) {
  this.findOne({email: email}, function(err, user) {
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
userSchema.statics.getCoursesByEmail = function(email, callback) {
  this.findOne(email)
      .populate('courses')
      .exec(function(err, user) {
        if (err) {
          callback(err);
        }
        else if (!user) {
          callback("userID does not exist");
        }
        else {
          callback(undefined, user.courses);
        }
      })
};
userSchema.statics.getNotificationsByEmail = function(email, callback) {
  this.findOne({email: email}, function(err, user) {
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
userSchema.statics.getUserRoleByEmail = function(email, callback) {
  this.findOne({email: email}, function(err, user) {
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

