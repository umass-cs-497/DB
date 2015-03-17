var mongoose = require('mongoose');
mongoose.connect('mongodb://freddy:freddy@ds063870.mongolab.com:63870/learn_u');
setTimeout(function() {
  process.exit();
}, 1000);

var User = require('./users.js').User;
var Course = require('./courses.js').Course;
var Lecture = require('./lectures.js').Lecture;

module.exports = {
  User: User,
  Course: Course,
  Lecture: Lecture
};
