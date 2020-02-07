const mongoose = require('mongoose');
const crypto = require('crypto');

const schemas = require('./mongoDbSchemas.js');
const session = require('./session.js');

function validateUser()
{
    return true;
}

function validateEvent()
{
    return true;
}

exports.loginCheck = function(req, res, next)
{
    var sid = session.getSession(req);
    if(sid)
    {
        return next();
    }
    else{
        res.statusCode = 401;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Content for logged in users\n');
    }
}

exports.register = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    
    if(validateUser(req.body))
    {
        var hashSHA256 = crypto
            .createHash('sha256')
            .update(req.body.password)
            .digest('hex');

        var user = mongoose.model('User', schemas.userSchema);
        
        user.findOne()
            .sort({ uid: -1 })
            .then(lastRecord => {
                var nextId = 0;
                if(lastRecord)
                {
                    nextId = lastRecord.uid + 1;
                }
                console.log('last record: '+ nextId);
                var newUser = new user({
                    uid: nextId,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: hashSHA256,
                    status: 0
                });
                newUser.save(function(err, saveInfo) {
                    if(err) {
                        console.log(err);
                        res.end('error during addition to database');
                    }
                    else{
                        console.log('user added successfully');
                        res.end('user added successfully');
                    }
                });
            });
    }
    else {
        res.end('user data dosent match constraints')
    }
}

exports.login = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var user = mongoose.model('User', schemas.userSchema);
    user.findOne({ email: req.body.email }, 'uid email password')
        .then(userRecord => {
            if(!userRecord)
            {
                res.end(JSON.stringify({ stat: 'Invalid username' }));
                console.log('Invalid username');
            }
            else {
                var hashSHA256 = crypto
                    .createHash('sha256')
                    .update(req.body.password)
                    .digest('hex');
                if(userRecord.password == hashSHA256)
                {
                    session.createSession(res, userRecord.uid);
                    res.end(JSON.stringify({
                        stat: 'Successful login',
                        userId: userRecord.uid
                    }));
                }
                else
                {
                    res.end(JSON.stringify({ stat: 'Invalid password' }));
                }
            }
        });
}

exports.logout = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var sid = session.getSession(req);
    if(sid)
    {
        session.closeSession(sid);
        res.end('logout successful\n');
    }
    else
    {
        res.end('logout unsuccessful\n');
    }
}

exports.addEvent = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if(validateEvent(req.body))
    {
        var currentUid = session.findUser(session.getSession(req));
        var event = mongoose.model('Event', schemas.eventSchema);
        
        event.findOne()
            .sort({ eid: -1 })
            .then(lastRecord => {
                var nextId = 0;
                if(lastRecord)
                {
                    nextId = lastRecord.eid + 1;
                }
                console.log('last record: '+ nextId);
                var newEvent = new event({
                    eid: nextId,
                    uid: currentUid,
                    name: req.body.name,
                    title: req.body.title,
                    address: req.body.address,
                    description: req.body.description,
                    date: req.body.date,
                    status: 0
                });
                newEvent.save(function(err, saveInfo) {
                    if(err) {
                        console.log(err);
                        res.end('error during addition to database');
                    }
                    else {
                        var user = mongoose.model('User', schemas.UserSchema);
                        user.updateOne(
                            { uid: currentUid },
                            { $push: { eventsCreated: nextId } },
                            (err, raw) => {
                                if(err) {
                                    console.log(err);
                                    res.end('error during addition to database');
                                }
                                else {
                                    console.log('event added successfully');
                                    res.end('event added successfully');
                                }
                            }
                        );
                    }
                });
            });
    }
    else {
        res.end('event data dosent match constraints')
    }
}

exports.updateEvent = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    if(validateEvent(req.body))
    {
        var event = mongoose.model('Event', schemas.eventSchema);

        event.updateOne(
            { eid: req.body.eid },
            { $set: { 
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
                date: req.body.date
            }},
             (err, raw) => {
                if(err) {
                    console.log('updating event faliure: ' + err);
                    res.end('updating event faliure');
                }
                else res.end('event updated successfully');
            }
        );
    }
    else {
        res.end('event data dosent match constraints');
    }
}

exports.invite = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var user = mongoose.model('User', schemas.userSchema);
    user.updateOne(
        { uid: req.body.uid },
        { $addToSet: { invitations: {
            eid: req.body.eid,
            invitationStatus: 0
        }}},
        (err, raw) => {
            if(err) res.end('sending invitation faliure');
            else {
                var event = mongoose.model('Event', schemas.eventSchema);
                event.updateOne(
                    { eid: req.body.eid },
                    { $addToSet: { invitedUsers: {
                        uid: req.body.uid,
                        invitationStatus: 0
                    }}},
                    (err, raw) => {
                        if(err) res.end('sending invitation faliure');
                        else res.end('invitation sent successfully');
                    }
                );
            }
        }
    );
}

exports.acceptInvitation = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var userId = session.findUser(session.getSession(req));

    var user = mongoose.model('User', schemas.userSchema);
    user.updateOne(
        { uid: userId, "invitations.eid": req.body.eid },
        { $set: { "invitations.$.invitationStatus": 1 } },
        (err, raw) => {
            if(err) res.end('accepting invitation faliure: 1');
            else {
                var event = mongoose.model('Event', schemas.eventSchema);
                event.updateOne(
                    { eid: req.body.eid, "invitedUsers.uid": userId },
                    { $set: { "invitedUsers.$.invitationStatus": 1
                    }},
                    (err, raw) => {
                        if(err) res.end('accepting invitation faliure: 2');
                        else {
                            updateUserEventsParticipatedIn(userId, req.body.eid, 0);
                            updateEventParticipants(req.body.eid, userId, 0);
                            res.end('invitation accepted successfully');
                        }
                    }
                );
            }
        }
    );
}

exports.rejectInvitation = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var userId = session.findUser(session.getSession(req));

    var user = mongoose.model('User', schemas.userSchema);
    user.updateOne(
        { uid: userId, "invitations.eid": req.body.eid },
        { $set: { "invitations.$.invitationStatus": 2 } },
        (err, raw) => {
            if(err) res.end('rejecting invitation faliure: 1');
            else {
                var event = mongoose.model('Event', schemas.eventSchema);
                event.updateOne(
                    { eid: req.body.eid, "invitedUsers.uid": userId },
                    { $set: { "invitedUsers.$.invitationStatus": 2
                    }},
                    (err, raw) => {
                        if(err) res.end('rejecting invitation faliure: 2');
                        else {
                            updateUserEventsParticipatedIn(userId, req.body.eid, 1);
                            updateEventParticipants(req.body.eid, userId, 1);
                            res.end('invitation rejected successfully');
                        }
                    }
                );
            }
        }
    );
}

function updateUserEventsParticipatedIn(userId, eventId, operation)
{
    // operation = 0 - add event
    // operation = 1 - remove event

    var operationQuery;

    if(operation == 0)
    {
        operationQuery = { $addToSet: { eventsParticipatedIn: eventId } };
    }
    else if(operation == 1)
    {
        operationQuery = { $pull: { eventsParticipatedIn: eventId } };
    }
    else
    {
        return false;
    }

    var user = mongoose.model('User', schemas.userSchema);
    user.updateOne(
        { uid: userId },
        operationQuery,
        (err, raw) => {
            if(err)
            {
                console.log('error: ' + err);
                return false;
            }
            else{
                return true;
            }
        }
    );
}

function updateEventParticipants(eventId, userId, operation)
{
    // operation = 0 - add user
    // operation = 1 - remove user

    var operationQuery;

    if(operation == 0)
    {
        operationQuery = { $addToSet: { participants: userId } };
    }
    else if(operation == 1)
    {
        operationQuery = { $pull: { participants: userId } };
    }
    else
    {
        return false;
    }

    var event = mongoose.model('Event', schemas.eventSchema);
    event.updateOne(
        { eid: eventId },
        operationQuery,
        (err, raw) => {
            if(err)
            {
                console.log(err);
                return false;
            }
            else{
                return true;
            }
        }
    );
}

exports.declareParticipation = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var userId = session.findUser(session.getSession(req));

    updateUserEventsParticipatedIn(userId, req.body.eid, 0);
    updateEventParticipants(req.body.eid, userId, 0);

    res.end('Participation declared successfully\n');
}

exports.cancelDeclaration = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');

    var userId = session.findUser(session.getSession(req));

    updateUserEventsParticipatedIn(userId, req.body.eid, 1);
    updateEventParticipants(req.body.eid, userId, 1);

    res.end('Participation cancelled successfully\n');
}

exports.findUsers = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    var query = {};

    if(req.body.firstName != null)
    {
        query.firstName = { $regex: req.body.firstName };
    }
    if(req.body.lastName != null)
    {
        query.lastName = { $regex: req.body.lastName };
    }
    if(req.body.email != null)
    {
        query.email = { $regex: req.body.email };
    }
    if(req.body.eventParticipatedIn != null)
    {
        query.eventsParticipatedIn = req.body.eventParticipatedIn;
    }
    if(req.body.eventCreated != null)
    {
        query.eventsCreated = { $regex: req.body.eventCreated };
    }
    if(req.body.invitationEid != null)
    {
        if(req.body.invitationStatus != null) {
            query.invitations = { $elemMatch: { 
                eid: req.body.invitationEid,
                invitationStatus: req.body.invitationStatus
            }};
        }
        else {
            query.invitations = { $elemMatch: { eid: req.body.invitationEid } };
        }
    }

    var user = mongoose.model('User', schemas.userSchema);
    user.find(query, 'uid firstName lastName email')
        .limit(5)
        .then(records => {
            if(!records)
            {
                console.log('no users found');
                res.end('no users found\n');
            }
            else{
                res.end(JSON.stringify(records));
            }
        });
}

exports.findEvents = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    var query = {};

    if(req.body.name != null)
    {
        query.name = { $regex: req.body.name };
    }
    if(req.body.title != null)
    {
        query.title = { $regex: req.body.title };
    }
    if(req.body.description != null)
    {
        query.description = { $regex: req.body.description };
    }
    if(req.body.uid != null)
    {
        query.uid = req.body.uid;
    }
    if(req.body.invitedUserUid != null)
    {
        if(req.body.invitedUserStatus != null) {
            query.invitedUsers = { $elemMatch: { 
                uid: req.body.invitedUserUid,
                invitationStatus: req.body.invitedUserStatus
            }};
        }
        else {
            query.invitedUsers = { $elemMatch: { uid: req.body.invitedUserUid } };
        }
    }
    if(req.body.participant != null)
    {
        query.participants = req.body.participant;
    }
    // find by date

    var event = mongoose.model('Events', schemas.eventSchema);
    event.find(query, 'eid uid name title description date')
        .limit(5)
        .then(records => {
            if(!records)
            {
                console.log('no events found');
                res.end('no events found\n');
            }
            else{
                res.end(JSON.stringify(records));
            }
        });
}

exports.getUser = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    var userId = null;

    if(('uid' in req.body) == true)
    {
        userId = req.body.uid;
    }
    else{
        userId = session.findUser(session.getSession(req));
    }

    var user = mongoose.model('User', schemas.userSchema);
    user.findOne({ uid: userId })
        .then(userRecord => {
            if(!userRecord)
            {
                res.end('Invalid user Id');
            }
            else {
                if(userRecord.uid == session.findUser(session.getSession(req)))
                {
                    // less restricted user info
                    res.end(JSON.stringify({
                        uid: userRecord.uid,
                        firstName: userRecord.firstName,
                        lastName: userRecord.lastName,
                        email: userRecord.email,
                        eventsParticipatedIn: userRecord.eventsParticipatedIn,
                        eventsCreated: userRecord.eventsCreated,
                        createdAt: userRecord.createdAt,
                        invitations: userRecord.invitations
                    }));
                }
                else {
                    // more restricted user info
                    res.end(JSON.stringify({
                        uid: userRecord.uid,
                        firstName: userRecord.firstName,
                        lastName: userRecord.lastName,
                        email: userRecord.email,
                        eventsParticipatedIn: userRecord.eventsParticipatedIn,
                        eventsCreated: userRecord.eventsCreated
                    }));
                }
            }
        });
}

exports.getEvent = function(req, res)
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');

    var event = mongoose.model('Event', schemas.eventSchema);
    event.findOne({ eid: req.body.eid })
        .then(eventRecord => {
            if(!eventRecord)
            {
                res.end('Invalid event Id');
                console.log('Invalid event Id');
            }
            else {
                res.end(JSON.stringify({
                    eid: eventRecord.eid,
                    uid: eventRecord.uid,
                    name: eventRecord.name,
                    title: eventRecord.title,
                    address: eventRecord.address,
                    description: eventRecord.description,
                    date: eventRecord.date,
                    participants: eventRecord.participants,
                    invitedUsers: eventRecord.invitedUsers
                }));
            }
        });
}