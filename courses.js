var mongoose = require('mongoose');//using mongoose
//connection to local machine
mongoose.connect('mongodb://localhost/lecture');

//connection to the db
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
	console.log("connected");
});