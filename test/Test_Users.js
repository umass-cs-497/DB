/**
 * Created by freddy on 3/17/15.
 */
/**
 * Created by freddy on 3/17/15.
 */
var Course = require('../index.js').Course;
var User = require('../index.js').User;

//Course.create({
//  courseNumber: '496S',
//  courseSection: '01',
//  department: 'CMPSCI',
//  description: 'nope',
//  permission: 1,
//  instructors: ['Tim Richards'],
//  lectures: [],
//  registeredUsers: [],
//  emails: [],
//  semester: 'S15',
//  title: 'SWS'
//}, function(err, course) {
//  console.log(err);
//  console.log(course);
//  User.create({
//    email: 'freddy@umass.edu',
//    password: 'freddy',
//    username: 'freddy',
//    name: {
//      first: 'freddy',
//      last: 'freddy'
//    },
//    role: 'freddy',
//    courses:[course.id],
//    notifications: [],
//    bookmarks: []
//  }, function(err, user) {
//    console.log(err);
//    console.log(user);
//  });
//});

User.getCoursesByEmail('freddy@umass.edu', function(err, courses) {
  console.log(err);
  console.log(courses);
});