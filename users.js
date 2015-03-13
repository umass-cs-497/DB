var mongoose = require('mongoose');//using mongoose to connect
//connects to local machine.
mongoose.connect('mongodb://localhost/lecture');

//database connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback){
	console.log("connected");
});