const mongoose = require('mongoose');
const Schema = mongoose.Schema;
	
const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  spots: [{
    type: Schema.Types.ObjectId,
    ref: 'Spotted'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);