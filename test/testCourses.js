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
	 		  assert.norEqual(testCourse, null);
	 		  assert.equal(testCourse.semester, 'Fall');
	 		  assert.equal(testCourse.department,'Sociology');
	 		  assert.equal(testCourse.courseNumber, 'SOC101');
	 		});
	 	});
	 });

	 /*
	  * Post-condition
	  */
	  // after(function(done){
	  // 	db_api.courses.dropCoursesDatabase(function(err, message){
	  // 		console.log(message);
	  // 		assert.equal(err,null);
	  // 		assert.notEqual(message,0);
	  // 		message.should.eql(1);
	  // 		done();
	  // 	});
	  // });

	  /*
	   * 
	   */
	   it('creates a new course based on semester, department and courseNumber: Fall, Sociology, SOC101',function(done){
		    db_api.courses.createCourse('Fall','Sociology','SOC101',function(err,course){
	 		  assert.equal(err,null);
	 		  assert.norEqual(courses, null);
	 		  assert.equal(courses.semester, 'Fall');
	 		  assert.equal(course.department,'Sociology');
	 		  assert.equal(course.courseNumber, 'SOC101');
	 		  done();
		 	});
		}); 	
});