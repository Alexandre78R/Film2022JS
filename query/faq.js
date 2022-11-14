// Import model faq
var FAQ = require("../models/faq.js");

var reponse = {};

// Function pour voir les faq
async function viewFAQ () {

    var searchListFAQ = await search_list_faq();
    // console.log("searchListFAQ", searchListFAQ);
    if (searchListFAQ.length == 0) {
        reponse.status = false;
        reponse.text = "Aucune FAQ se trouve dans la base de données !";
        reponse.data = searchListFAQ;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "Listes FAQ trouver !";
        reponse.data = searchListFAQ;
        return reponse;
    }
}

// Function pour voir une faq
async function viewFAQID (req) {

    var idEditFaq = req.params.id;
    
    var searchIdFAQ = await search_id_faq(idEditFaq);

    if (!searchIdFAQ) {
        reponse.status = false;
        reponse.text = "Impossible de trouver la FAQ !";
        reponse.data = searchIdFAQ;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        reponse.data = searchIdFAQ;
        return reponse;
    }
}

// Function pour gérer l'ajout d'une faq
async function addFAQ (req) {

    //Stockage des données reçus du front
    var faqDataAdd  = {
        quest: req.body.quest,
        response: req.body.response,
    };

    var createFAQ = await create_faq(faqDataAdd);

    if (!createFAQ) {
        reponse.status = false;
        reponse.text = "Erreur interne : Impossible de créer la nouvelle FAQ !";
        reponse.data = createFAQ;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        reponse.data = createFAQ;
        return reponse;
    }
}

// Function pour gérer l'ajout d'une faq
async function delFAQ (req) {

    var delIdFAQ = req.params.id;

    var delFAQ = await del_faq(delIdFAQ);

    if (!delFAQ) {
        reponse.status = false;
        reponse.text = "Erreur interne : Impossible de suprimer la FAQ !";
        reponse.data = delFAQ;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "FAQ suprrimer !";
        reponse.data = delFAQ;
        return reponse;
    }
}

// Function pour gérer l'edit d'une faq
async function editFAQ (req) {

    var editIdFAQ = req.params.id;

    var faqDataEdit = {
        _id : req.params.id,
        quest: req.body.quest,
        response: req.body.response,
    };

    var editFAQ = await edit_faq(editIdFAQ, faqDataEdit);

    if (!editFAQ) {
        reponse.status = false;
        reponse.text = "Erreur interne : Impossible de modifier la FAQ !";
        reponse.data = editFAQ;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        reponse.data = editFAQ;
        return reponse;
    }
}

// Function pour récupérer la liste des FAQ dans la base de donnée
async function search_list_faq () {

    var reponseSearchListFAQ = false;

    // Requête vers la bdd
    await FAQ.find().then(faq => {
        reponseSearchListFAQ = faq;
    }).catch(err => {
        reponseSearchListFAQ = false; 
    });

    return reponseSearchListFAQ;

}

// Function pour récupérer la FAQ dans la base de donnée
async function search_id_faq (id) {

    var reponseSearchIdFAQ = false;

    // Requête vers la bdd
    await FAQ.findById({
        _id: id,
    }).then(async faq => {
        reponseSearchIdFAQ = faq;
    }).catch(err => {
        reponseSearchIdFAQ = false;
    });

    return reponseSearchIdFAQ;

}

// Function pour créer une FAQ dans la base de donnée
async function create_faq (faqDataAdd) {

    var reponseCreateFAQ = false;

    // Requête vers la bdd
    await FAQ.create(faqDataAdd).then(faq => {
        reponseCreateFAQ = faq;
    }).catch(err => {
        reponseCreateFAQ = false; 
    });

    return reponseCreateFAQ;
    
}

// Function pour suprimer une FAQ dans la base de donnée
async function del_faq (id) {

    var reponseDelFAQ = false;

    // Requête à la base de donnée
    await FAQ.findByIdAndRemove(id)
    .then(faq => {
        reponseDelFAQ = faq;
    })
    .catch(err => {
        reponseDelFAQ = false;
    });

    return reponseDelFAQ;
    
}

// Function pour edit une FAQ dans la base de donnée
async function edit_faq (id, faqDataEdit) {

    var reponseEditFAQ = false;

    // Requête à la base de donnée
    await FAQ.update({ _id : id}, faqDataEdit)
    .then(faq => {
        reponseEditFAQ = faq;
    })
    //Si il y a une erreur
    .catch(err => {
        reponseEditFAQ = false;
    });

    return reponseEditFAQ;
    
}

module.exports = {
    viewFAQ : viewFAQ,
    addFAQ : addFAQ,
    delFAQ : delFAQ,
    editFAQ : editFAQ,
    viewFAQID : viewFAQID,
};