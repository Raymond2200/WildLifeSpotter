const mongoose = require('mongoose');
const GeoJSON = require('mongoose-geojson-schema');
const Schema = mongoose.Schema;

const spottedSchema = new Schema({
    animalType: String,
    coordiantes: mongoose.Schema.Types.Point,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Spotted', spottedSchema);