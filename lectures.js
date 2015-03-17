/**
 * Created by freddy on 3/16/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

mongoose.connect('mongodb://freddy:freddy@ds063870.mongolab.com:63870/learn_u');

// database connection
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  // Schema definition for lectures
  var lectureSchema = new Schema({
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    date: {type: Date, unique: true},
    // link to lecture video
    video: String,
    // links to lecture whiteboard images,
    whiteboardImages: [String],
    // links to lecture computer screen images,
    screenImages: [String],
    comments: [{
      author: String,
      content: String,
      date: Date,
      replies: [{
        author: String,
        content: String,
        date: Date
      }]
    }]
  });

  var Course = mongoose.model('Course');
  var Lecture = mongoose.model('Lecture', lectureSchema);

  exports.Lecture = Lecture;
});