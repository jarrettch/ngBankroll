/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Visit Schema
 */
var VisitSchema = new Schema({
    datePlayed: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        default: '',
        trim: true
    },
    visitType: {
        type: String,
        default: '',
        trim: true
    },
    stakes: {
        type: String,
        default: '',
        trim: true
    },
    hoursPlayed: {
        type: Number,
        default: 0
    },
    profitOrLoss: {
        type: Number,
        default: 0
    },
    notes: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Validations
 */
VisitSchema.path('location').validate(function(location) {
    return location.length;
}, 'Location cannot be blank');

/**
 * Statics
 */
VisitSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Visit', VisitSchema);
