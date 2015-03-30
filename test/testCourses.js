var db_api = require('../index.js');
var should = require('chai').should();
var assert = require('assert');
var expect = require('chai').expect();

describe('Testing Courses collection:', function(){
	
	/*
	 * Precondition
	 */
	 var testCourse = null;
	 var testUser   = null;
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

	 before(function(done){
	 	db_api.users.dropUserDatabase(function(){
		 	db_api.users.createUser('test20@test.com', 'password', 'username', 'role', function(err,usr){
		 		testUser = usr;
		        assert.equal(err, null);
		        assert.notEqual(testUser, null);
		        assert.equal(testUser.email, 'test20@test.com');
		        assert.equal(testUser.password, 'password');
		        assert.equal(testUser.username, 'username');
		        assert.equal(testUser.role, 'role');
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

	   /*
	    * Tests that getCourseById returns the right course.
	    */
	    it('retrieves a course by ID: ID', function(done){
	    	db_api.courses.getCourseById(testCourse._id, function(err, course){
	    		assert.equal(err,null);
	    		assert.notEqual(course, null);
	    		assert.equal(course.courseNumber,testCourse.courseNumber);
	    		assert.equal(course.department,testCourse.department);
	    		assert.equal(course.semester,testCourse.semester);
	    		done();
	    	});
	    });

	    /*
	     *
	     */
	     it('add user to a course by ID: courseID, userID', function(done){
	     	db_api.courses.addUserById(testCourse._id,testUser._id,function(err,course){
	     		assert.equal(err,null);
	     		assert.notEqual(course,null);
	     		course._id.should.eql(testCourse._id);
	     		
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