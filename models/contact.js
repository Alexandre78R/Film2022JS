const mongoose = require('mongoose');

// Schema Contact de la BDD.
var contactSchema = mongoose.Schema({
    lastname: String,
	firstname: String,
    email : String,
    message : String,
},{ timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('Contact', contactSchema);