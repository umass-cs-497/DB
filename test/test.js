var db_api = require('../index.js');
var should = require('chai').should();
var assert = require('assert');

describe('Testing User collection:', function(){
  /*
   *  precondition
   */
  var testUser = null;
  before(function(done){
    db_api.users.dropUserDatabase();
    db_api.users.createUser('test@test.com', 'password','username','role', function(err, doc){
      testUser = doc;
      assert.equal(err, null);
      assert.notEqual(testUser, null);
      assert.equal(testUser.email, 'test@test.com');
      assert.equal(testUser.password, 'password');
      assert.equal(testUser.username, 'username');
      assert.equal(testUser.role, 'role');
      done();
    });
  });

  /*
   * post-condition
   */
  after(function(done) {
    db_api.users.deleteUserByEmail('test@test.com', function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, 0);
      count.should.eql(1);
      done();
    })
  });

  /*
   * Tests whether a user gets stored in the database or not.
   */
  it('registers a new user with email: test2@test.com', function(done){
    db_api.users.createUser('test2@test.com', 'password','username','role', function(err, doc){
      assert.equal(err, null);
      assert.notEqual(doc, null);
      doc.email.should.eql('test2@test.com');
      done();
    });
  });

  /*
   * Tests whether an existing user gets deleted from the database
   */
  it('deletes a user with email: test2@test.com', function(done) {
    db_api.users.deleteUserByEmail('test2@test.com', function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, null);
      count.should.eql(1);
      done();
    });
  });

  /*
   * Tests whether user role is return properly.
   */
  it('retrieves user Role by Email', function(done) {
    db_api.users.getUserRoleByEmail('test@test.com', function(err, role) {
      assert.equal(err, null);
      assert.notEqual(role, null);
      role.should.eql('role');
      done();
    });
  });

  /*
   * Tests whether username is properly set.
   */
  it('set username by Email', function(done) {
    db_api.users.setUsernameByEmail('test@test.com','username', function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, 0);
      count.should.eql(1);//1 for success 0 for failure
      done();
    });
  });

  /*
   * Test whether the function sets the name of the user properly.
   */
  it('set name by Email: firstname, lastname', function(done) {
    db_api.users.setNameByEmail('test@test.com','firstname','lastname', function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, 0);
      count.should.eql(1);//1 for success 0 for failure
      done();
    });
  });

  /*
   * Tests whether a notification is properly added by the function.
   */
  it('Add notifications by Email: Email, title, url, date', function(done) {
    db_api.users.addNotificationByEmail('test@test.com',{title: "title",url:"url",date: new Date()}, function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, 0);
      count.should.eql(1);//1 for success 0 for failure
      done();
    });
  });

  /*
   * Tests whether notifications are properly retrieved.
   */
  it('retrieves notifications by Email', function(done) {
    db_api.users.getNotificationsByEmail('test@test.com', function(err, notifications) {
      assert.equal(err, null);
      assert.notEqual(notifications, null);
      assert.equal(notifications.length, 1);
      notifications[0].title.should.eql('title');
      notifications[0].url.should.eql('url');
      done();
    });
  });

  /*
   * Tests whether a bookmark is properly added by the function.
   */
  it('Add bookmark by Email: Email, title, url', function(done) {
    db_api.users.addBookmarkByEmail('test@test.com',{title: "title",url:"url"}, function(err, count) {
      assert.equal(err, null);
      assert.notEqual(count, 0);
      count.should.eql(1);//1 for success 0 for failure
      done();
    });
  });

  /*
   * Tests whether a a bookmark is properly retrieved.
   */
  it('retrieves bookmark by Email: Email', function(done) {
    db_api.users.getBookmarksByEmail('test@test.com', function(err, bookmarks) {
      assert.equal(err, null);
      assert.notEqual(bookmarks, null);
      assert.equal(bookmarks.length, 1);
      bookmarks[0].title.should.eql('title');
      bookmarks[0].url.should.eql('url');
      done();
    });
  });  

  /*
   * Test whether the user returned is correct.
   * Test ObjectID must be a 12-byte string.
   */
  it('retrieves user by ID: ID', function(done) {
    db_api.users.getUserById(testUser._id, function(err, user) {
      assert.equal(err, null);
      user.email.should.eql('test@test.com');
      done();
    });
  });
});

  // it('drops the users from the database', function(message) {
  //   db_api.users.getUserById('id', function(id) {
  //     assert.notEqual(id, null);
  //     id.should.not.eql(1);//1 for success
  //     done();
  //   });
  // });  
/*

dropUserDatabase

getCoursesByEmail


*/