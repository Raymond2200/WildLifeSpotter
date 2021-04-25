const Spotted = require('../models/spotted');
const User = require('../models/user');

module.exports = {
    create
}

async function create(req, res) {
    try{
        let newSpot = await Spotted.create({
            animalType: req.body.animalType,
            lat: req.body.lat,
            lng: req.body.lng,
            description: req.body.description,
            user: req.user._id
        })
        using = await User.findById(req.user._id)
        using.spots.push(newSpot)
    } catch {
        console.log('backend fail')
    }
}