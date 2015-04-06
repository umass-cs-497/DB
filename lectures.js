/**
 * Created by freddy on 3/16/15.
 */
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Schema definition for lectures
var lectureSchema = new Schema({
  // reference to the course that this lecture belongs to, should be an ObjectIds in Course collection.
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Course'
  },
  date: {type: Date, unique: true},
  // link to lecture video
  video: String,
  // visibility of the courses
  visibility: boolean,
  // links to lecture whiteboard images,
  whiteboardImages: [String],
  // links to lecture computer screen images,
  screenImages: [String],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

/*
  Methods to work with Lecture database.
  For getter methods, callback should be in the form function(err, data).
 */

lectureSchema.statics.getCommentsById = function(id, callback) {
  this.findById(id)
      .populate('comments')
      .exec(function (err, lecture) {
        if (err)
          callback(err);
        else if (!lecture)
          callback("lectureID does not exist.");
        else
          callback(undefined, lecture.comments);
      });
};

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

var Lecture = mongoose.model('Lecture', lectureSchema);

exports.Lecture = Lecture;

/*
todos:
*visible:boolean


*/