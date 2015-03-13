var mongoose = require('mongoose');//using mongoose to connect
//connects to local machine.
mongoose.connect('mongodb://localhost/lecture');

//database connectionn 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
	console.log("connected");
});

var userSchema = new mongoose.Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,

  firstName: String,
  lastName: String,
  role: String,	
  profilePic: String,

  course: {
    title: { type: String },
    department: { type: String },
    section: { type: String },
    term: { type: String },
     year: {type: String}
  },




});
