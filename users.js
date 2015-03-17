var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://freddy:freddy@ds063870.mongolab.com:63870/learn_u');

// database connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
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
        callback(undefined, user.courses);
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

  var Course = mongoose.model('Course');
  var User = mongoose.model('User', userSchema);

  exports.User = User;
});
