var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/',function (req,res) {
	res.sendFile(__dirname + '/index.html');
});
app.get('/chat',function (req,res) {
	res.sendFile(__dirname + '/chat.html');
});

io.on('connection',function(client){
	client.on('join', function(name) {
		client.nickname = name;
	});
	client.on('messages', function(msg){
		var nickname = client.nickname;
	    io.emit('messages', nickname+": "+msg);
	});
	client.on('user', function(){
		var nickname = client.nickname;
	    io.emit('user', nickname);
	});
});


server.listen(8080);