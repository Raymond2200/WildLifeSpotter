const Spotted = require('../models/spotted');

module.exports = {
    archivedSpots,
    mySpots,
    recentSpots,
}










function archivedSpots(req, res) {
    console.log("archived spots hit")
    Spotted.find({}, function(err, posts) {
        res.json(posts)
    })
}

function mySpots (req, res) {
    console.log("my spots hit")
    Spotted.find({}, function(err, posts) {
        res.json(posts)
    })
}

function recentSpots (req, res) {
    console.log("recent spots hit")
    Spotted.find({}, function(err, posts) {
        res.json(posts)
    })
}