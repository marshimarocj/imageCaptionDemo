var http = require("http");
var async = require("async");
var fs = require("fs");
var request = require("request");
var net = require('net');
var path = require('path');

function processor(picURL, res){
	async.series([
		function(callback){
			downloadPic(picURL, callback);			
		},
		function(callback){
			processPicHTTP(res, callback);
		}/*,
		function(callback){
			response(res, picURL, callback);
		}	*/
	], 
	function(err, values){
		console.log(values);
	});
	
	
}

function downloadPic(picURL, callback){
	request(picURL).pipe(fs.createWriteStream('temp/temp.jpg'));
	callback(null, 'downloadPic');
/*	http.get(picURL, function(resPic){
		var imgData = "";

		resPic.setEncoding("binary"); //一定要设置response的编码为binary否则会下载下来的图片打不开
		resPic.on("data", function(chunk){
			imgData+=chunk;
		});
		resPic.on("end", function(){
			fs.writeFile("./temp/temp.jpg", imgData, "binary", function(err){
				if(err){
					console.log("down fail, " + err);
				}
				console.log("download success");
				callback(null, 'downloadPic')
			});
		});
	});	
*/
}

/*
function processPic(res, callback){
	var HOST = '127.0.0.1';
	var PORT = 8001;

	var client = new net.Socket();
	client.connect(PORT, HOST, function() {

		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		// 建立连接后立即向服务器发送数据，服务器将收到这些数据 
		client.write(path.join(__dirname, 'temp', 'temp.jpg'));
		console.log("request send.");

	});

	// 为客户端添加“data”事件处理函数
	// data是服务器发回的数据
	client.on('data', function(data) {

		console.log('DATA: ' + data);
		// 完全关闭连接
		client.destroy();
		response(res, data, callback);

	});
	
	client.on('error', function(error){
		console.log(error.stack);
	});

	// 为客户端添加“close”事件处理函数
	client.on('close', function() {
		console.log('Connection closed\n');
	});
}

*/

function processPicHTTP(res, callback){
//	var content = path.join(__dirname, 'temp', 'temp.jpg');
	var content = path.join('/data/Image2SentenceDemo/', 'temp', 'temp.jpg');
	var options ={
		host: '222.29.195.82',
		port: 8001,
		path: '222.29.195.82:8001/path?path=' + content,
		method: 'GET'
	};

	var result = "";

	var req = http.request(options, function(resDocker){
		resDocker.setEncoding('utf8');
		resDocker.on('data', function(chunk){
			result += chunk;
			response(res, result, callback);
		});
	});

	req.on('error', function(e){
		console.log(e.stack);
	});

	req.end();
}


function response(res, data, callback){
	res.setHeader("Content-Type","text/plain");
    res.setHeader("Access-Control-Allow-Origin","*");
/*	var date = new Date();
	picURL += "</br>";
	picURL += date.toLocaleString();
	console.log(picURL);
*/
	res.send(data);	
	callback(null, 'response');
}

/*
function execScript(res, callback){
	var exec = require('child_process').exec;
	exec('python craper.py ',function(error,stdout,stderr){
		if(stdout){
			console.log(stdout);
			response(res, stdout);
		}
		if(error) {
			console.info(stderr);
			response(res, stderr);
		}
		callback(null, 'execScript');
	});
}
*/

exports.processor = processor;
