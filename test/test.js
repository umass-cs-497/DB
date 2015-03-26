var db_api = require('../index.js');
var should = require('chai').should();
var assert = require('assert');

describe('Testing User collection:', function(){

  before(function(done){
    db_api.users.dropUserDatabase();
    db_api.users.createUser('test@test.com', 'password','username','role', function(err, doc){
      assert.equal(err, null);
      assert.notEqual(doc, null);
      done();
    });
  });
  after(function(done) {
    db_api.users.deleteUserByEmail('test@test.com', function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, 0);
      count.should.eql(1);
      done();
    })
  });

  it('registers a new user with email: test2@test.com', function(done){
    db_api.users.createUser('test2@test.com', 'password','username','role', function(err, doc){
      assert.equal(err, null);
      assert.notEqual(doc, null);
      doc.email.should.eql('test2@test.com');
      done();
    });
  });

  it('deletes a user with email: test2@test.com', function(done) {
    db_api.users.deleteUserByEmail('test2@test.com', function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, null);
      count.should.eql(1);
      done();
    });
  });

  it('retrieves user Role by Email', function(done) {
    db_api.users.getUserRoleByEmail('test@test.com', function(err, role) {
      assert.equal(err, null);
      assert.notEqual(role, null);
      role.should.eql('role');
      done();
    });
  });

  it('set username by Email', function(done) {
    db_api.users.setUsernameByEmail('test@test.com','username', function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, 0);
      count.should.eql(1);//1 for success 0 for failure
      done();
    });
  });

  it('set name by Email: firstname, lastname', function(done) {
    db_api.users.setNameByEmail('test@test.com','firstname','lastname', function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, 0);
      count.should.eql(1);//1 for success 0 for failure
      done();
    });
  });


    it('Add notifications by Email: Email, title, url, date', function(done) {
    db_api.users.addNotificationByEmail('test@test.com',{title: "title",url:"url",date:"date"}, function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, 0);
      count.should.eql(1);//1 for success 0 for failure
      done();
    });
  });



});

/*
addBookmarkByEmail


addNotificationByEmail
getNotificationsByEmail




dropUserDatabase
getBookmarksByEmail
getCoursesByEmail

getUserById

*/