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
	 		db_api.courses.createCourse('Fall','Sociology','SOC101',function(err,course){
	 		  testCourse = course;
	 		  assert.equal(err,null);
	 		  assert.norEqual(testCourse, null);
	 		  assert.equal(testCourse.semester, 'Fall');
	 		  assert.equal(testCourse.department,'Sociology');
	 		  assert.equal(testCourse.courseNumber, 'SOC101');
	 		});
	 	});
	 });

});