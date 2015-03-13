var mongoose = require('mongoose');//using mongoose
//connection to local machine
mongoose.connect('mongodb://localhost/lecture');

//connection to the db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
	console.log("connected");
});

//course schema
var courseSchema = new mongoose.Schema({
  ObjectId: String,
  title: String,
  department: String,
  courseNumber: String,	
  description: String,
  courseSection: String,
  semester: String,
  instructor: { type: String, unique: true},
  roaster: {type: String, unique: true},
  lecture: String	



});
