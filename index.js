var express = require('express');
var app = express();
var request = require('request');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});


app.get('/searching', function(req, res){
	var val = req.query.search;
 	//console.log(val);

 	request.post({
  		headers: {'Content-Type' : 'application/json'},
  		method: 'post',
  		url:     'https://www.antwerpen.be/srv/content/d/search?save=true',
  		json: {"type":[{"key":9,"value":"Infofiche","type":"type"}],"titel":[{"key":"titel","value":val,"type":"titel"}]}
	}, function(error, response, body){
  		console.log('Body die terug komt? ',body);
	});
});


app.get('/login', function(req, res){
	var user = req.query.username;
	var pass = req.query.password;
 	//console.log(val);
 	request.post({
  		headers: {'Content-Type' : 'application/json'},
  		method: 'post',
  		url:     'https://www.antwerpen.be/srv/user/d/auth',
  		json: {"username": user, "password": pass}
	}, function(error, response, body){
  		console.log('Body die terug komt? ',body, '////// Response: ', response);
  		res.send(body);
	});
});
