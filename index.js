var express = require('express');
var app = express();
var request = require('request');
var toughcookie = require('tough-cookie');

app.set('port', (process.env.PORT || 5000));

// serveer de polymeer
app.use(express.static(__dirname + '/public'));

// gewuun ne status update
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});

// Search voor infofiches
app.get('/searching', function(req, res){
	var val = req.query.search;
 	//console.log(val);
 	request.post({
  		headers: {'Content-Type' : 'application/json'},
  		method: 'post',
  		jar: true,
  		url:     'https://www.antwerpen.be/srv/content/d/search?save=true',
  		json: {"type":[{"key":9,"value":"Infofiche","type":"type"}],"titel":[{"key":"titel","value":val,"type":"titel"}]}
	}, function(error, response, body){
  		console.log('Body die terug komt? ',body, ' response: ', response);
  		res.send(body);
	});
});

// Login voor profiel
app.get('/login', function(req, res){
	var user = req.query.username;
	var pass = req.query.password;
 	//console.log(val);
 	request.post({
  		headers: {'Content-Type' : 'application/json'},
  		method: 'post',
  		jar: true,
  		url:     'https://www.antwerpen.be/srv/user/d/auth',
  		json: {"username": user, "password": pass}
	}, function(error, response, body){
  		console.log('Body die terug komt? ',body, '////// Response: ', response);
  		console.log('cookie? ',response.headers['set-cookie']);
  		res.send(body);
	});
});

// Notificaties 
app.get('/notifications', function(req, res){
 	//console.log(val);
 	request.get({url: 'https://www.antwerpen.be/srv/notification/d/unread', jar: true}, function(error, response, body){
  		console.log('Body die terug komt? ',body, '////// Response: ', response);
  		res.send(body);
	});
});


