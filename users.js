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
  Useful methods to access the User database.
  For getter methods, callback should in the form function(error, returned_data).
  For setter methods, callback should in the form function(error, number_of_docs_affected, raw_mongo_response).
 */

/*
  Method to add a bookmark to the user account with given email.
 */
userSchema.statics.addBookmarkByEmail = function(email, newBookmark, callback) {
  this.update(
      {email: email},
      {$push: {bookmarks: newBookmark}},
      callback
  );
};

/*
  Method to add a notification to the user account with given email.
 */
userSchema.statics.addNotificationByEmail = function(email, newNotification, callback) {
  this.update(
      {email: email},
      {$push: {notifications: newNotification}},
      callback
  );
};

/*
  Method to create a user with the given email, password, username and role.
 */
userSchema.statics.createUser = function(email, password, username, role, callback) {
  var userModel = this;
  userModel.findOne({email: email}, function(err, user) {
    if (err)
      callback(err);
    else if (user) {
      callback("user with email " + email + " already exists");
    }
    else {
      userModel.create({
        email: email,
        password: password,
        username: username,
        role: role
      }, callback);
    }
  });
};

/*
  Method to delete user from database by email
 */
userSchema.statics.deleteUserByEmail = function(email, callback) {
  var userModel = this;
  userModel.remove({email: email}, function(err, count) {
    if (err) {
      callback(err);
    }
    else {
      callback(undefined, count);
    }
  });
};

/*
  Method to drop the whole user collection
 */
userSchema.statics.dropUserDatabase = function(callback) {
  this.remove({}, function(err) {
    if (err) {
      console.log(err);
      callback(err);
    }
    else
      console.log("user database dropped");
  	  callback(1);
  });
};

/*
  Method to get a user's bookmarks by user's email.
 */
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

/*
  Method to get a user's registered courses by user's email.
 */
userSchema.statics.getCoursesByEmail = function(email, callback) {
  this.findOne({email: email})
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

/*
  Method to get user's notifications by user's email.
 */
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

/*
  Method to get user's role (student, instructor,...) by user's email.
 */
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

/*
  Method to get the whole user's document in the database by objectId.
 */
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

/*
  Method to change user first and last name.
 */
userSchema.statics.setNameByEmail = function(email, firstName, lastName, callback) {
  this.update(
      {email: email},
      {$set: {name : {first: firstName, last: lastName}}},
      callback
  );
};

/*
  Method to update username.
 */
userSchema.statics.setUsernameByEmail = function(email, newUsername, callback) {
  this.update(
      {email: email},
      {$set: {username : newUsername}},
      callback
  );
};


var User = mongoose.model('User', userSchema);

exports.User = User;

