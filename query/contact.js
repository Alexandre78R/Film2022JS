// Import model faq
const CONTACT = require("../models/contact.js");

var reponse = {};

// Function pour voir les contacts
async function viewContact () {

    var searchListContact = await search_list_contact();

    if (searchListContact.length == 0) {
        reponse.status = false;
        reponse.text = "Aucun message de contact se trouve dans la base de données !";
        reponse.data = searchListContact;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "Listes contact trouver !";
        reponse.data = searchListContact;
        return reponse;
    }
}

// Function pour gérer l'ajout message Contact
async function delContact (req) {

    var delIdContact = req.params.id;

    var delContact = await del_contact(delIdContact);

    if (!delContact) {
        reponse.status = false;
        reponse.text = "Erreur interne : Impossible de suprimer le contact !";
        reponse.data = delContact;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        reponse.data = delContact;
        return reponse;
    }
}

// Function pour gérer l'ajout d'un contact 
async function addContact (req) {

    //Stockage des données reçus du front
    var contactDataAdd = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email : req.body.email,
        message : req.body.message,
    };

    var addContact = await add_contact(contactDataAdd);

    if (!addContact) {
        reponse.status = false;
        reponse.text = "Erreur interne : Impossible d'envoyez le message de contact !";
        reponse.data = addContact;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        reponse.data = addContact;
        return reponse;
    }
}

// Function pour ajouter le nouveau contact
async function add_contact (contactDataAdd) {
    
    var reponseAddContact = false;

    await CONTACT.create(contactDataAdd)
    .then(contact => {
        reponseAddContact = contact;
    })
    //Si il y a une erreur
    .catch(err => {
        reponseAddContact = false;
    });

    return reponseAddContact;
}

// Function pour récupérer la liste des CONTACT dans la base de donnée
async function search_list_contact () {

    var reponseSearchListContact = false;

    // Requête vers la bdd
    await CONTACT.find().then(contact => {
        reponseSearchListContact = contact;
    }).catch(err => {
        reponseSearchListContact = false; 
    });

    return reponseSearchListContact;

}

// Function pour suprimer un contact dans la base de donnée
async function del_contact (id) {

    var reponseDelContact = false;

    // Requête à la base de donnée
    await CONTACT.findByIdAndRemove(id)
    .then(contact => {
        reponseDelContact = contact;
    })
    .catch(err => {
        reponseDelContact = false;
    });

    return reponseDelContact;
}

module.exports = {
    viewContact :viewContact,
    delContact : delContact,
    addContact : addContact,
};