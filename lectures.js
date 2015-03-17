/**
 * Created by freddy on 3/16/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

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

var Course = require('./courses.js').Course;
var Lecture = mongoose.model('Lecture', lectureSchema);

exports.Lecture = Lecture;