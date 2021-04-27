const Spotted = require('../models/spotted');
const User = require('../models/user');

module.exports = {
    create,
    archivedSpots,
    mySpots,
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
        let spots = await Spotted.find(
            {
            location:
                {$near:
                    {$geometry: {
                        type: "Point",
                        coordinates: [req.params.lng, req.params.lat]},
                    $maxDistance: 100000,
                    $minDistance: 0
                    }
                }
            }
            // , {"timestamp":
            //     {$gte: [new Date,(Date.now - 1000 * 60 * 60)]}
            // }
        )
        res.json(spots)
    } catch(err) {
        console.log(err)
        res.send("500 Internal Server Error")
    }
}


async function archivedSpots(req, res) {
    try{
        let spots = await Spotted.find(
            {
                location:
                {$near:
                    {$geometry: {type: "Point", coordinates: [req.params.lng, req.params.lat]},
                    $maxDistance: 100000,
                    $minDistance: 0
                    }
                }
            }
        )
        console.log("hello")
        res.json(spots)
    } catch(err) {
        console.log(err)
        res.send("500 Internal Server Error")
    }
}


function mySpots (req, res) {
    console.log("my spots hit")
    Spotted.find({}, function(err, posts) {
        res.json(posts)
    })
}

