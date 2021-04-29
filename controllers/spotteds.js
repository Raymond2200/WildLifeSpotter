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
        console.log(newspot)
        using = await User.findById(req.user._id)
        using.spots.push(newSpot)
        using.save()
        res.send("200 OK")
    } catch {
        res.send("500 Internal Server Error")
    }
}

async function nearMeSpots(req, res) {
    let time = new Date
    time.setHours(-2)
    tt=new Date 
    try{
        await Spotted.find({ 
            $and:[{
            location:
            {$near:
                {$geometry: {
                    type: "Point",
                    coordinates: [req.params.lng, req.params.lat]},
                    $maxDistance: 100000,
                    $minDistance: 0
                }
            }},{
            updatedAt : {$gte: time}}] 
        }).populate('user').exec((err, spotteds) =>  {res.json(spotteds)})
        console.log(time)
        console.log(tt)
    } catch(err) {
        console.log(err)
        res.send("500 Internal Server Error")
    }
}


async function archivedSpots(req, res) {
    try{
        await Spotted.find(
            {
                location:
                {$near:
                    {$geometry: {type: "Point", coordinates: [req.params.lng, req.params.lat]},
                    $maxDistance: 100000,
                    $minDistance: 0
                    }
                }
            }
        ).populate('user').exec((err, spotteds) =>  {res.json(spotteds)})
    } catch(err) {
        console.log(err)
        res.send("500 Internal Server Error")
    }
}


async function mySpots (req, res) {
    try{
    await Spotted.find({user : req.user._id}).populate('user').exec((err, spotteds) =>  {res.json(spotteds)})
    } catch(err) {
        console.log(err)
        res.send("500 Internal Server Error")
    }
}

