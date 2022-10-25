const mongoose = require('mongoose');

// Schema Contact de la BDD.
var filmSchema = mongoose.Schema({
    name: {
		type: String,
		unique: true,
		required: true
	},
	img: String,
    public_id : String,
    url_alloCine : String,
    note_alloCine : Number,
    url_senscritique : String,
    note_senscritique : Number, 
    url_cineserie : String,
    note_cineserie : Number,
    url_source : String, 
    descriptions : String
},{ timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('Film', filmSchema);