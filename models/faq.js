const mongoose = require('mongoose');

// Schema faq de la BDD.
var faqSchema = mongoose.Schema({
    quest: String,
	response: String,
},{ timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('FAQ', faqSchema);