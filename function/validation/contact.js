var regex = require("../regex.js");

var reponse = {};

async function valdationContactAdd (req) {

    //Stockage des données reçus du front
    var contactDataAdd = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email : req.body.email,
        message : req.body.message,
    };

    if (req.body.lastname === "" || req.body.lastname == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre Nom !";
        reponse.data = contactDataAdd;
        return reponse;
    } else if (!regex.name_verif(req.body.lastname)) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre nom correctement !";
        reponse.data = contactDataAdd;
        return reponse;
    } else if (req.body.firstname === "" || req.body.firstname == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre prénom !";
        reponse.data = contactDataAdd;
        return reponse;
    } else if (!regex.name_verif(req.body.firstname)) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre prénom correctement !";
        reponse.data = contactDataAdd;
        return reponse;
    } else if (req.body.email === "" || req.body.email == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre email !";
        reponse.data = contactDataAdd;
        return reponse;
    } else if (!regex.email_verif(req.body.email)) {
        reponse.status = false;
        reponse.text = "Merci d'insérer un email correct !";
        reponse.data = contactDataAdd;
        return reponse;
    } else if (req.body.message === "" || req.body.message == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre message !";
        reponse.data = contactDataAdd;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "Message envoyer !";
        reponse.data = contactDataAdd;
        return reponse;
    }
}

module.exports = {
    valdationContactAdd: valdationContactAdd,
};