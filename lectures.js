/**
 * Created by freddy on 3/16/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Schema definition for lectures
var lectureSchema = new Schema({
  // reference to the course that this lecture belongs to, elements should be ObjectIds in Course collection.
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

/*
 Methods to work with Course database.
 callback should be in the form function (err, data).
 */

lectureSchema.statics.getLectureById = function(id, callback) {
  this.findById(id, function(err, lecture) {
    if (err) {
      callback(err);
    }
    else if (!lecture) {
      callback("lectureID does not exist");
    }
    else {
      callback(undefined, lecture);
    }
  });
};

var Course = require('./courses.js').Course;
var Lecture = mongoose.model('Lecture', lectureSchema);

exports.Lecture = Lecture;