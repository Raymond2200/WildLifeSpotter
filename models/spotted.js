const mongoose = require('mongoose');
const GeoJSON = require('mongoose-geojson-schema');
const Schema = mongoose.Schema;

const spottedSchema = new Schema({
    animalType: String,
    location: {type: 
        { type: String},
        coordinates:[]
    },
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});


spottedSchema.index({ location: "2dsphere" });
module.exports = mongoose.model('Spotted', spottedSchema);