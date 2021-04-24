const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spottedSchema = new Schema({
    animalType: String,
    lan: String,
    lon: String,
    description: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Spotted', spottedSchema);