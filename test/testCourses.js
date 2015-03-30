var db_api = require('../index.js');
var should = require('chai').should();
var assert = require('assert');

describe('Testing Courses collection:', function(){
	
	/*
	 * Preconditions.
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
	 //required for a test user.
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

	 before(function(done){
	 	db_api.courses.addUserById(testCourse._id, testUser._id, function(err,course){
	 		assert.equal(err,null);
	 		assert.notEqual(course,null);
	 		course._id.should.eql(testCourse._id);
	 		done();
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
	   * Tests the createCourse method creates a course properly.
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
	     * Test that the user is added by its id and and course id.
	     */
	     it('add user to a course by ID: courseID, userID', function(done){
	     	db_api.courses.addUserById(testCourse._id,testUser._id,function(err,course){
	     		assert.equal(err,null);
	     		assert.notEqual(course,null);
	     		course._id.should.eql(testCourse._id);
	     		course.registeredUsers[0].should.eql(testUser._id);
	     		done();
	     	});
	     });

	     /*
	      * Tests that the course retreived by course id is correct.
	      */
	      it('retrieves course by Id: courseID',function(done){
	      	db_api.courses.getCourseById(testCourse._id, function(err,course){
	      		assert.equal(err, null);
	      		assert.notEqual(course,null);
	      		assert.equal(course.courseNumber, 'SOC101');
	      		assert.equal(course.semester, 'Fall');
	      		assert.equal(course.department,'Sociology');
	      		course._id.should.eql(testCourse._id);
	      		done();
	      	});
	      });

	      /*
	       * Tests that the users returned are correct.
	       */
	       it('retrieves users email by courseId: courseID',function(done){
	       	 db_api.courses.getRegisteredUsersById(testCourse._id,function(err,user){
	       	 	assert.equal(err,null);
	       	 	assert.notEqual(user,null);
	       	 	console.log(user);
	       	 	done();
	       	 });
	       });

	      /*
		   * Tests that the users emails returned are correct.
		   */
		   it('retrieves user email by courseID: courseID',function(done){
		   	db_api.courses.getAllUserEmailsById(testCourse._id,function(err,user){
		   		assert.equal(err,null);
		   		assert.notEqual(user,null);
		   		console.log("esto");
		   		done();
		   	});
		   });

		   	/*
		   	 * Test that deleteCourseById deletes the course properly.
		   	 */
		   	 it('deletes a course by ID: courseID',function(done){
		   	 	db_api.courses.deleteCourseById(testCourse._id,function(err,count){
		   	 		assert.equal(err,null);
		   	 		assert.notEqual(count,null);
		   	 		count.should.eql(1);//1 for success
		   	 		done();
		   	 	});
		   	 });


		  
});

/*
getRegisteredUsersById
getAllUserEmailsById

dropCoursesDatabase



*/