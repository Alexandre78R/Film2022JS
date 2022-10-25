//Import  environnement 
var env = require("../environnement.js");

module.exports = {
    //Clé secret de cryptage password
    "secret" : env.secret,
    // Adresse de la BDD
    "userBDD" : env.userBDD,
    // Api cloudinary
    "cloud_name_cloudinary": env.cloud_name_cloudinary,
    "api_key_cloudinary": env.api_key_cloudinary,
    "api_secret_cloudinary": env.api_secret_cloudinary
}