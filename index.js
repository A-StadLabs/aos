var express = require('express');
var app = express();
var request = require('request');
var toughcookie = require('tough-cookie');
var session = require('express-session');
var Firebase = require('firebase');

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
		  //req.session.userobject = body;
      console.log(body.success);
      if(body.success==true){
        req.session.userobject = body;
      };
  		res.send(body);
	});
});

//logout
app.get('/logout', function(req, res){
	req.session.destroy(function(err) {
  	// cannot access session here
	});
});

// check user
app.get('/user', function(req, res){
	if(req.session.userobject){
		res.send(req.session.userobject);
	} else {
		res.send({ 'status': 'E', 'msg': 'User not logged in.'});
    req.session.destroy(function(err) {
    // cannot access session here
  });
	}
});

// CRS persoon 
app.get('/crs-persoon', function(req, res){
  //console.log(val);
  req.session.userobject;
  request.get({url: 'https://www.antwerpen.be/srv/user/d/account/crsklant/crspersoon', jar: true}, function(error, response, body){
      res.send(body);
  });
});

// CRS medewerker
app.get('/crs-medewerker', function(req, res){
  //console.log(val);
  req.session.userobject;
  request.get({url: 'https://www.antwerpen.be/srv/user/d/account/crsklant/info', jar: true}, function(error, response, body){
      res.send(body);
  });
});

// Find address  
app.get('/adres', function(req, res){
  var val = req.query.search;
  //req.session.userobject;
  request.get({url: 'https://www.antwerpen.be/srv/d/astad/location/search/'+val, jar: true}, function(error, response, body){
      res.send(body);
  });
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

//Content opvragen
app.get('/content', function(req, res){
  //console.log(val);
  var channelId = req.query.channelId;
  var contentType = req.query.contentType;
  var contentTags = req.query.contentTags;
  var start = req.query.contentStart;
  var limit = req.query.contentLimit;
  if(contentTags!='undefined'){
  request.get({url: 'https://www.antwerpen.be/srv/content/d/channel/'+channelId+'/content-type/'+contentType+'/tags/'+contentTags+'/start/'+start+'/limit/'+limit, jar: true}, function(error, response, body){
      res.send(body);
  });
} else {
  request.get({url: 'https://www.antwerpen.be/srv/content/d/channel/'+channelId+'/content-type/'+contentType+'/start/'+start+'/limit/'+limit, jar: true}, function(error, response, body){
      res.send(body);
  });
}
});

// infofiche categorieen
app.get('/infofichecats', function(req, res){
  //console.log(val);
  var val = req.query.infokey;
  request.get({url: 'https://www.antwerpen.be/srv/kanalen/d/category', jar: true}, function(error, response, body){
      res.send(body);
  });
});

// kanalen in thema
app.get('/infofichesubcats', function(req, res){
  //console.log(val);
  var val = req.query.cat;
  request.get({url: 'https://www.antwerpen.be/srv/kanalen/d/overzicht?official=true&sort=name&category='+val, jar: true}, function(error, response, body){
      res.send(body);
  });
});

// subcategorie in kanaal
app.get('/infofichetabs', function(req, res){
  //console.log(val);
  var val = req.query.slug;
  request.get({url: 'https://www.antwerpen.be/srv/kanalen/d/channels/'+val, jar: true}, function(error, response, body){
      res.send(body);
  });
});

//Homefeed opvragen
app.get('/homefeed', function(req, res){
  //console.log(val);
  request.get({url: 'https://www.antwerpen.be/srv/kanalen/d/homefeed/0/9', jar: true}, function(error, response, body){
      res.send(body);
  });
});

//Helpcenter content opvragen
app.get('/helpcenter', function(req, res){
  //console.log(val);
  request.get({url: 'https://www.antwerpen.be/srv/babbelbox/d/list?1417880524389&numberOfItems=20&start=0', jar: true}, function(error, response, body){
      res.send(body);
  });
});

//Helpcenter detail opvragen
app.get('/helpcenter-item', function(req, res){
  //console.log(val);
  var val = req.query.item;
  request.get({url: 'https://www.antwerpen.be/srv/babbelbox/d/show/'+val, jar: true}, function(error, response, body){
      res.send(body);
  });
});

// Chat
// Vind een gebruiker
app.get('/gebruiker', function(req, res){
  //console.log(val);
  var searchstring = req.query.search;
  var users =[];
  var findUser = new Firebase("https://blazing-fire-6426.firebaseio.com/chat/directory/");
          findUser.on("child_added", function(snapshot) {
            if(snapshot.val().username.substr(0, searchstring.length) == searchstring){
              users.push({ "username": snapshot.val().username, "userid": snapshot.val().userid, "avatar": snapshot.val().avatar, "firstname": snapshot.val().firstname });
              console.log(users);
            };
          });

          res.send(users);
});

// Notificaties

// Een notificatie versturen
app.get('/notificatie', function(req, res){
  //console.log(val);
  var user = req.query.user;
  var app = req.query.app;
  var msg = req.query.msg;
  var link = req.query.link;

  request.post({
    headers: {'Content-Type' : 'application/json'},
    method: 'post',
    url: 'https://www.antwerpen.be/srv/notification/d/add-notification', 
    jar: true,
    json: {app: app, // welke app verzend het
    user: username,  // naar wie moet dat
    message: msg, // wat is je bericht
    link: link},
    }, function(error, response, body){
      res.send(body);
      console.log(body);
  });
});

// Highscore opslaan
app.get('/highscore', function(req, res){
  //console.log(val);
  var naam = req.query.naam;
  var score = req.query.score;

  request.post({
    headers: {'Content-Type' : 'application/json'},
    method: 'post',
    url: 'https://sorteergame.firebaseio.com/.json', 
    json: {naam: naam, // welke app verzend het
    score: score},
    }, function(error, response, body){
      res.send(body);
      console.log(body);
  });
});

// Highscore weergeven
app.get('/get-highscore', function(req, res){
  //console.log(val);


  // request.post({
  //   headers: {'Content-Type' : 'application/json'},
  //   method: 'post',
  //   url: 'https://sorteergame.firebaseio.com/.json', 
  //   json: {naam: naam, // welke app verzend het
  //   score: score},
  //   }, function(error, response, body){
      res.send("kingflurkel");
      //console.log(body);
  });
});