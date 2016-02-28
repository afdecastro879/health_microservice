var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose       = require('mongoose'),
    requestify     = require("requestify");

  mongoose.connect('mongodb://ec2-54-164-141-121.compute-1.amazonaws.com:27017/kml_db', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
  });
// Middlewares
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(allowCrossDomain);

//Register app to api gateway
const apiGatewayUrl = "http://localhost:3002/apps";
requestify.request(apiGatewayUrl, {
    method: "POST",
    body: {
        "appName": "petsHealth",
        "hostName": "localhost",
        "port": 3001,
        "service": "/park",
        "method": "GET"
    },
    headers: {
        'Content-Type': 'application/json'
    }
}).then(function (response) {
    console.log("Service registered successfully");
});

// Import Models and Controllers
var modelPark = require('./models/park')(app, mongoose);
var modelPet = require('./models/pet')(app, mongoose);
//var modelPeth = require('./models/peth')(app, mongoose);
var ParkCtrl = require('./controllers/park');

// API routers
var pets = express.Router();

pets.route('/park/:pet')
	.get(ParkCtrl.findCloseParks);

app.use('/', pets);

// Start Server
app.listen(3001, function(){
	console.log("Server runing on http://localhost:3001");
});
