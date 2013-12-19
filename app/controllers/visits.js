/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Visit = mongoose.model('Visit'),
    _ = require('underscore');


/**
 * Find visit by id
 */
exports.visit = function(req, res, next, id) {
    Visit.load(id, function(err, visit) {
        if (err) return next(err);
        if (!visit) return next(new Error('Failed to load visit ' + id));
        req.visit = visit;
        next();
    });
};

/**
 * Create a visit
 */
exports.create = function(req, res) {
    var visit = new Visit(req.body);
    visit.user = req.user;

    visit.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                visit: visit
            });
        } else {
            res.jsonp(visit);
        }
    });
};

/**
 * Update a visit
 */
exports.update = function(req, res) {
    var visit = req.visit;

    visit = _.extend(visit, req.body);

    visit.save(function(err) {
        res.jsonp(visit);
    });
};

/**
 * Delete a visit
 */
exports.destroy = function(req, res) {
    var visit = req.visit;

    visit.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(visit);
        }
    });
};

/**
 * Show a visit
 */
exports.show = function(req, res) {
    res.jsonp(req.visit);
};

/**
 * List of visits
 */
exports.all = function(req, res) {
    Visit.find().sort('-created').populate('user', 'name username').exec(function(err, visits) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(visits);
        }
    });
};
