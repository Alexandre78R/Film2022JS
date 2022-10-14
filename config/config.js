//Import  environnement 
var env = require("../environnement.js");

module.exports = {
    //Clé secret de cryptage password
    "secret" : env.secret,
    // Adresse de la BDD
    "userBDD" : env.userBDD
}