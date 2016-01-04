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
		/*function(callback){
			processPicHTTP(res, callback);
		},*/
		function(callback){
			response(res, picURL, callback);
		}
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

		resPic.setEncoding("binary"); //һ��Ҫ����response�ı���Ϊbinary���������������ͼƬ�򲻿�
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
		// �������Ӻ�������������������ݣ����������յ���Щ���� 
		client.write(path.join(__dirname, 'temp', 'temp.jpg'));
		console.log("request send.");

	});

	// Ϊ�ͻ�����ӡ�data���¼�������
	// data�Ƿ��������ص�����
	client.on('data', function(data) {

		console.log('DATA: ' + data);
		// ��ȫ�ر�����
		client.destroy();
		response(res, data, callback);

	});
	
	client.on('error', function(error){
		console.log(error.stack);
	});

	// Ϊ�ͻ�����ӡ�close���¼�������
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
