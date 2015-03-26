var mongoose = require('mongoose');
var User = require('../index.js').users;
var should = require('chai').should();

describe('createUser', function(){
  var currentUser = null;

  beforeEach(function(done){
    User.createUser('test@test.com', 'password','username','role', function(e,doc){
      currentUser = doc;
      done();
    });
  });


 

  it('registers a new user', function(done){
    User.createUser('test2@test.com', 'password','username2','role2', function(doc){
      doc.email.should.eql('test2@test.com');
      done();
    });
  });

  // it('fetches user by email', function(done){
  //   user.findByEmail('test@test.com', function(doc){
  //     doc.email.should.eql('test@test.com');
  //     done();
  //   });
  // });
});
