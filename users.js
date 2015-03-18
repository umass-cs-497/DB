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
  // list of references to registered courses, element should be ObjectIds in Course collection.
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

/*
  Useful methods to access the user database.
  For each method's invocation, 'callback' should in the form function(error, data).
 */

userSchema.statics.createUser = function(email, password, username, role, callback) {
  this.findOne({email: email}, function(err, user) {
    if (err)
      callback(err);
    else if (user) {
      callback("user with email " + email + " already exists");
    }
    else {
      this.create({
        email: email,
        password: password,
        username: username,
        role: role
      }, function(err, newUser) {
        callback(err, newUser);
      })
    }
  });
};
userSchema.statics.getBookmarksByEmail = function(email, callback) {
  this.findOne({email: email}, function(err, user) {
    if (err) {
      callback(err);
    }
    else if (!user) {
      callback("email does not exist.");
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
          callback("email does not exist");
        }
        else {
          callback(undefined, user.courses);
        }
      });
};
userSchema.statics.getNotificationsByEmail = function(email, callback) {
  this.findOne({email: email}, function(err, user) {
    if (err) {
      callback(err);
    }
    else if (!user) {
      callback("email does not exist.");
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
      callback('email does not exist.');
    }
    else {
      callback(undefined, user.role);
    }
  });
};
userSchema.statics.getUserById = function(id, callback) {
  this.findById(id, function(err, user) {
    if (err)
      callback(err);
    else if (!user) {
      callback("userID does not exist");
    }
    else {
      callback(undefined, user);
    }
  });
};

var Course = require('./courses.js').Course;
var User = mongoose.model('User', userSchema);

exports.User = User;

