var db_api = require('../index.js');
var should = require('chai').should();
var assert = require('assert');

describe('Testing Courses collection:', function(){
	/*
	 * Precondition
	 */
	 before(function(done){
	 	db_api.courses.dropCoursesDatabase(function(){

	 	});
	 });

});