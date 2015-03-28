var db_api = require('../index.js');
var should = require('chai').should();
var assert = require('assert');

describe('Testing Courses collection:', function(){
	/*
	 * Precondition
	 */
	 var testCourse = null;
	 before(function(done){
	 	db_api.courses.dropCoursesDatabase(function(){
	 		db_api.courses.createCourse('Fall','Sociology','SOC101', function(err,course) {
	 		  testCourse = course;
	 		  assert.equal(err,null);
	 		  assert.notEqual(testCourse, null);
	 		  assert.equal(testCourse.semester, 'Fall');
	 		  assert.equal(testCourse.department,'Sociology');
	 		  assert.equal(testCourse.courseNumber, 'SOC101');
	 		  done();
	 		});
	 	});
	 });

	 /*
	  * Post-condition
	  */
	  // after(function(done){
	  // 	db_api.courses.dropCoursesDatabase(function(err, message){
	  // 		console.log(err);
	  // 		assert.equal(err,null);
	  // 		assert.notEqual(message,0);
	  // 		assert.equal(message,1);
	  // 		done();
	  // 	});
	  // });

	  /*
	   * Tests the createCourse method creates a course properly
	   */
	   it('creates a new course based on semester, department and courseNumber: Fall, Sociology, SOC101',function(done){
		    db_api.courses.createCourse('Fall','Sociology','SOC101',function(err,course){
	 		  assert.equal(err,null);
	 		  assert.notEqual(course, null);
	 		  assert.equal(course.semester, 'Fall');
	 		  assert.equal(course.department,'Sociology');
	 		  assert.equal(course.courseNumber, 'SOC101');
	 		  done();
		 	});
		}); 	


});

/*


addUserById
getCourseById
getRegisteredUsersById
getAllUserEmailsById

dropCoursesDatabase



*/