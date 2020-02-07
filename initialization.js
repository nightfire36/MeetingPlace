const express = require('express');
const app = express();

const mongoose = require('mongoose');


const apiController = require('./apiController.js');
const session = require('./session.js');

function initStaticController()
{
    var router = express.Router();

    app.use(express.static('./static'));

    app.get('/', function(req, res) {
        console.log('home page request');
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.sendFile('static/index.html', { root: '.' });
    });
}

function initApiController()
{
    var router = express.Router();

    console.log('Api controller initialization...');

    app.use(express.json());

    app.use('/api', router);

    router.post('/register', apiController.register);
    router.post('/login', apiController.login);
    router.post('/logout', apiController.loginCheck, apiController.logout);

    router.post('/add_event', apiController.loginCheck, apiController.addEvent);
    router.post('/update_event', apiController.loginCheck, apiController.updateEvent);
    router.post('/invite', apiController.loginCheck, apiController.invite);
    router.post('/accept_invitation', apiController.loginCheck, apiController.acceptInvitation);
    router.post('/reject_invitation', apiController.loginCheck, apiController.rejectInvitation);
    router.post('/declare_participation', apiController.loginCheck, apiController.declareParticipation);
    router.post('/cancel_declaration', apiController.loginCheck, apiController.cancelDeclaration);

    router.post('/find_users', apiController.loginCheck, apiController.findUsers);
    router.post('/find_events', apiController.loginCheck, apiController.findEvents);
    router.post('/get_user', apiController.loginCheck, apiController.getUser);
    router.post('/get_event', apiController.loginCheck, apiController.getEvent);
}

function initMongoDb()
{
    const mongoDbServer = 'localhost:27017';
    const dbName = 'meeting';
    
    mongoose.connect('mongodb://' + mongoDbServer + '/' + dbName, 
        { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Db connection successful'))
        .catch(err => console.error('Db connection error: ' + err));

    mongoose.set('useCreateIndex', true);
}

exports.initialize = function()
{
    console.log("node.js server initialization...");

    const hostname = 'localhost';
    const port = 4050;

    session.initSecret();
    
    initMongoDb();
    
    initStaticController();
    initApiController();
    
    app.listen(port, hostname);
}