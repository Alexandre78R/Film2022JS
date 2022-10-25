
// Import de cloudinary V2
var cloudinary = require('cloudinary').v2;

// Fichier configuration
const config = require('../config/config');

cloudinary.config({
    cloud_name: config.cloud_name_cloudinary,
    api_key: config.api_key_cloudinary,
    api_secret: config.api_secret_cloudinary
});

module.exports = {
    cloudinary: cloudinary,
};