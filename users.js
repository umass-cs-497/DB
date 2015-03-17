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
    firstName: String,
    lastName: String,
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

  var Course = mongoose.model('Course');
  var User = mongoose.model('User', userSchema);

  exports.User = User;
});
