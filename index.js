var express = require('express');
var app = express();
var request = require('request');
var toughcookie = require('tough-cookie');
var session = require('express-session');

app.set('port', (process.env.PORT || 5000));

// serveer de polymeer
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'benissangekkie',
  resave: true,
  saveUninitialized: true
}));

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
		req.session.userobject = body;
  		res.send(body);
	});
});

app.get('/user', function(req, res){
	if(req.session.userobject){
		res.send(req.session.userobject);
	} else {
		res.send({ 'status': 'E', 'msg': 'User not logged in.'});
	}

});

// Notificaties 
app.get('/notifications', function(req, res){
 	//console.log(val);
 	req.session.userobject;
 	request.get({url: 'https://www.antwerpen.be/srv/notification/d/unread', jar: true}, function(error, response, body){
  		res.send(body);
	});
});

//Infofiche detail opvragen
app.get('/infofichedetail', function(req, res){
 	//console.log(val);
 	var val = req.query.infokey;
 	request.get({url: 'https://www.antwerpen.be/srv/content/d/detail/id/'+val, jar: true}, function(error, response, body){
  		res.send(body);
	});
});


