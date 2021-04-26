const Spotted = require('../models/spotted');
const User = require('../models/user');

module.exports = {
    create,
    archivedSpots,
    mySpots,
    recentSpots,
    nearMeSpots,
}

async function create(req, res) {
    try{
        let newSpot = await Spotted.create({
            animalType: req.body.animalType,
            location: {
                type: "Point",
                coordinates: req.body.location},
            description: req.body.description,
            user: req.user._id
        })
        using = await User.findById(req.user._id)
        using.spots.push(newSpot)
        using.save()
        res.send("200 OK")
    } catch {
        res.send("500 Internal Server Error")
    }
}

async function nearMeSpots(req, res) {
    try{
        console.log("step 1")
        console.log(req.params.lng)
        console.log(req.params.lat)
        let spots = await Spotted.find(
            {
                location:
                {$near:
                    {$geometry: {type: "Point", coordinates: [-77.835251, 45.910191]},
                    $maxDistance: 100000,
                    $minDistance: 0
                    }
                }
            }
        )
        console.log("step 2")
        console.log(spots)
        res.json(spots)
    } catch(err) {
        console.log(err)
        res.send("500 Internal Server Error")
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

