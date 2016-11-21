var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var configFile = require('./config/index.js')(app);
//configFile(app);
var modelsFile = require('./models/index.js')(app);
//modelsFile(app);


var config = app.get('config');

app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Credentials', true);
	res.header('Access-Control-Allow-Origin', req.headers.origin);
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');

	if ('OPTIONS' === req.method) {
		res.status(200).end();
	} else {
		next();
	}
});

app.use(express.static(__dirname + '/adminpanel'));
app.get('/add-coursebite', function (req, res) {
	res.sendFile(__dirname + '/adminpanel/add-courseBite.html');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

var router = express.Router();
app.set('router', router);
app.use(router);
require('./routes/index.js')(app);

var http = require('http');

http.createServer(app)
	.listen(config.PORT, function () {
		console.log('app start on port ' + config.PORT);
	});
