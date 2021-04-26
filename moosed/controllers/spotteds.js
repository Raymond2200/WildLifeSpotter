const Spotted = require('../models/spotted');
const User = require('../models/user');

module.exports = {
    create,
    archivedSpots,
    mySpots,
    recentSpots,
}

async function create(req, res) {
    try{
        let newSpot = await Spotted.create({
            animalType: req.body.animalType,
            coordinates: coordinates,
            description: req.body.description,
            user: req.user._id
        })
        using = await User.findById(req.user._id)
        using.spots.push(newSpot)
    } catch {
        console.log('backend fail')
    }
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

