const mongoose = require('mongoose');

exports.userSchema = new mongoose.Schema({
    uid: {
        type: Number,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: Buffer,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        required: true
    },
    eventsParticipatedIn: [{
        type: Number
    }],
    eventsCreated: [{
        type: Number
    }],
    invitations: [{
        eid: {
            type: Number,
            required: true
        },
        invitationStatus: {
            type: Number,
            required: true
        }
    }]
});

exports.eventSchema = new mongoose.Schema({
    eid: {
        type: Number,
        unique: true,
        required: true
    },
    uid: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Number,
        required: true
    },
    participants: [{
        type: Number
    }],
    invitedUsers: [{
        uid: {
            type: Number,
            required: true
        },
        invitationStatus: {
            type: Number,
            required: true
        }
    }]
});
