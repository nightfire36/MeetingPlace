const crypto = require('crypto');
const cookie = require('cookie');
const cookieSignature = require('cookie-signature');

var secret;

var sessions = [];
var sessionId = 10000;

class Session
{
    constructor(userId)
    {
        this.userId = userId;
        this.sessionId = ++sessionId;
    }

    getUid()
    {
        return this.userId;
    }

    getSid()
    {
        return this.sessionId;
    }
}

exports.initSecret = function()
{
    crypto.randomBytes(20, function (err, buf) {
        if(err)
        {
            console.log(err);
        }
        else{
            secret = buf.toString('hex');
        }
    });
}

exports.createSession = function(res, userId)
{
    var createdSession = new Session(userId);
    sessions.push(createdSession);
    res.setHeader('Set-Cookie', cookie.serialize('sid', 
        cookieSignature.sign(createdSession.getSid().toString(10), secret)));
}

exports.closeSession = function(sid)
{
    for(let val of sessions)
    {
        if(val.getSid() == sid)
        {
            sessions.splice(sessions.indexOf(val));
            return true;
        }
    }
    return false;
}

function findSession(sid)
{
    for(let val of sessions)
    {
        if(val.getSid() == sid)
        {
            return val.getSid();
        }
    }
    return false;
}

 exports.findUser = function(sid)
{
    for(let val of sessions)
    {
        if(val.getSid() == sid)
        {
            return val.getUid();
        }
    }
    return false;
}


exports.getSession = function(req)
{
    var sid = cookieSignature.unsign(cookie.parse(req.get('Cookie'))['sid'], secret);
    if(sid == false)
    {
        return false;
    }
    else{
        return findSession(parseInt(sid));
    }
}