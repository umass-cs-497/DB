var db_api = require('../index.js');
var should = require('chai').should();
var assert = require('assert');

describe('Testing User collection:', function(){
  var currentUser = null;

  beforeEach(function(done){
    db_api.users.createUser('test@test.com', 'password','username','role', function(err, doc){
      assert.equal(err, null);
      currentUser = doc;
      done();
    });
  });
  afterEach(function(done) {
    db_api.users.deleteUserByEmail('test@test.com', function(err, count) {
      assert.equal(err, null);
      count.should.eql(1);
      done();
    })
  });

  it('registers a new user with email: test2@test.com', function(done){
    db_api.users.createUser('test2@test.com', 'password','username','role', function(err, doc){
      assert.equal(err, null);
      doc.email.should.eql('test2@test.com');
      done();
    });
  });

  it('deletes a user with email: test2@test.com', function(done) {
    db_api.users.deleteUserByEmail('test2@test.com', function(err, count) {
      assert.equal(err, null);
      count.should.eql(1);
    });
    done();
  });

  // it('fetches user by email', function(done){
  //   user.findByEmail('test@test.com', function(doc){
  //     doc.email.should.eql('test@test.com');
  //     done();
  //   });
  // });
});
