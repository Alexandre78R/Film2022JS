var express = require('express');
var router = express.Router();

//Query Faq 
const query_faq = require("../query/faq.js");

// Validation Contact
const validation_contact = require("../function/validation/contact.js");

//Query Contact
const query_contact = require("../query/contact.js");

//Query Film
const query_film = require("../query/film.js");

// const db = require("../models/db.js");

// Param add Contact
var reponseContactAdd = { 
    status : true,
    text : "",
    data :  {}
};

// Param add faq
var reponseFAQAdd = { 
    status : true,
    text : "",
    data : {}
};

// Param Edit faq;
var reponseFaqEdit = {
    status : true,
    text : "",
    saveData : {},
    data : {}
};

// Param add Film
var reponseFilmAdd = {
    status : true,
    text : "",
    data : {}
};

// Param Edit fimm;
var reponseFilmEdit = {
    status : true,
    text : "",
    saveData : {},
    data : {}
};

// ------------------------------ Début ROUTE Film  ---------------------------


/* GET Acceuil page. */
router.get('/', async function(req, res, next) {

    // Session Pour ajout FAQ
    if (!req.session.reponseFAQAdd) req.session.reponseFAQAdd = reponseFAQAdd;
    
    // Session Pour modifier FAQ
    if (!req.session.reponseFaqEdit) req.session.reponseFaqEdit = reponseFaqEdit;

    // Session Pour ajout d'un film
    if (!req.session.reponseFilmAdd) req.session.reponseFilmAdd = reponseFilmAdd;

    // Session Pour modifier un film
    if (!req.session.reponseFilmEdit) req.session.reponseFilmEdit = reponseFilmEdit;

    // var perPage = 2;
    // var pages = Math.ceil(total / perPage);
    // var pageNumber = (res.query.page == null) ? 1 : req.query.page;
    // var startFrom = (pageNumber - 1) * perPage;
    var reponseFimviewBDD = await query_film.viewFilm();
    // .sort({ "id": -1})
    // .skip(startFrom)
    // .limit(perPage)
    // .toAray();

    res.render('./pages/index', { online: req.session.user, title: 'Film 2022 - Panel Film', reponseFilmView : reponseFimviewBDD});
});

// ------------------------------ FIN ROUTE Film  ---------------------------

// ------------------------------ Début ROUTE Contact ---------------------------

/* GET contact page. */
router.get('/contact', function(req, res, next) {
    reponseContactAdd.status = true;
    reponseContactAdd.text = "";
    reponseContactAdd.data = {};
    return res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - Contact' , reponseContactAdd });
});

//Route création d'un contact.
router.post('/contact', async function(req, res, next) {
    //Vérification du formulaire  
    var validationContactADD = await validation_contact.valdationContactAdd(req); 
    if (!validationContactADD.status) {
        reponseContactAdd.status = validationContactADD.status;
        reponseContactAdd.text = validationContactADD.text;
        reponseContactAdd.data = validationContactADD.data;
        return res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - Contact', reponseContactAdd });
    } else {
        // Reponse de la base donné
        var addContact = await query_contact.addContact(req);
        if (!addContact.status) {
            reponseContactAdd.status = addContact.status;
            reponseContactAdd.text = addContact.text;
            reponseContactAdd.data = addContact.data;
            return res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - Contact', reponseContactAdd });
        } else {
            return res.redirect("/");
        }
    }
});

// ------------------------------ Fin ROUTE Contact ---------------------------

// ------------------------------ Début ROUTE FAQ ---------------------------

/* GET faq page. */
router.get('/faq', async function(req, res, next) {
    // Response de la base de donnée
    var reponseFAQ = await query_faq.viewFAQ();
    return res.render('./pages/faq', { online: req.session.user, title: 'Film 2022 - FAQ', reponseFAQView : reponseFAQ});
});

// ------------------------------ FIN ROUTE FAQ ---------------------------

module.exports = router;