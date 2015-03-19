var mongoose = require('mongoose');
mongoose.connect('mongodb://freddy:freddy@ds043170.mongolab.com:43170/learn_u');

var User = require('./users.js').User;
var Course = require('./courses.js').Course;
var Lecture = require('./lectures.js').Lecture;

module.exports = {
  User: User,
  Course: Course,
  Lecture: Lecture
};
