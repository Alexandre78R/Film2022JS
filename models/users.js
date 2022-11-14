const mongoose = require('mongoose');
const jwt = require('jwt-simple');
const config = require('../config/config');

// Schema Users de la BDD.
var userSchema = mongoose.Schema({
    username: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	salt: String,
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
	password: String,
	role : Number,
	ban : Boolean,
},{ timestamps: { createdAt: 'created_at' }})

//Methode après le Schema.
userSchema.methods = {
	// Créaction du token avec notre clé secret dans le fichier config.
	getToken: function () {
		return jwt.encode(this, config.secret);
	}
}

module.exports = mongoose.model('User', userSchema);