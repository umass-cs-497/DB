var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://freddy:freddy@ds063870.mongolab.com:63870/learn_u');

// database connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(cb) {
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
    registeredUsers: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
    emails: [String],
    semester: String,
    title: String
  });

  var User = mongoose.model('User');
  var Lecture = mongoose.model('Lecture');
  var Course = mongoose.model('Course', courseSchema);

  exports.Course = Course;
});
