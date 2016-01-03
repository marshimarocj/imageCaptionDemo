//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');
var bodyParser = require('body-parser');

var processor = require('./processor').processor;
//var respondeMore = require('./respondeMore').respondeMore;


// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies  
      extended: true  
    }));

app.all('/getResult', function(req,res){
	console.log("get pic request.");
	var picURL = "";
/*    req.addListener("data",function(postchunk){
        postdata += postchunk;
    });
	req.addListener("end", function(){
		var date = new Date();
		//res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost:6001/"});
		res.send(date.toLocaleString());
		console.log(postdata + "\n" + date);
	});
*/	
	picURL = req.body.url;
	processor(picURL, res);
});
/*
app.all('/more', function(req,res){
	respondeMore(res);
});
*/
// start server on the specified port and binding host
app.listen(appEnv.port, function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
