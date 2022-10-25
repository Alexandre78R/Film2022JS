var express = require('express');
var router = express.Router();

//Shéma User
const User = require('../models/users.js');

//Import des modules pour le password
var uid2 = require("uid2");
var CryptoJS = require("crypto-js");

// Shéma FAQ 
const FAQ = require('../models/faq.js');

// Shéma Contact 
const CONTACT = require('../models/contact.js');

// les Function upload img
var upload_img = require('../function/upload_img.js');

//Shéma User
const FILM = require('../models/film.js');

// Import request regex
var regex = require("../function/regex.js");

// Param Reponse User login par défault 
var reponseUserLogin = { 
    status : true,
    text : ""
};

// Param view conact
var reponseContactView = { 
    status : true,
    text : "",
    data : ""
};

// Param add Contact
var reponseContactAdd = { 
    status : false,
    text : "",
    data :  {}
};

// Param view faq
var reponseFAQView = { 
    status : true,
    text : "",
    data : []
};

// ------------------------------ Début ROUTE Film  ---------------------------

// Séma bdd structure des fims ( si décourgament dans 10ùin ptdr)
// Nom (unique) name
// Image (Api sauvegarde image plus dépoyement) image url cloudinary
// public_id (Pour cloudinary (folder/nomde l'image ) pour delete)
// Allociné (Url Vérif Regex) url_allocine
// Allociné note note_allocine
// SensCritique (Url Vérif Regex) url_senscritique
// SensCritique note note_senscritique
// CinéSéries (Url Vérif Regex) url_cineseries
// CinéSéries note note_cinéséries
// Source (Url Vérif Regex) url_source
// description du film descriptions

/* GET Acceuil page. */
router.get('/', function(req, res, next) {

    // Param add faq
    var reponseFAQAdd = { 
        status : false,
        text : "",
        data : {}
    };

    // Param Edit faq;
    var reponseFaqEdit = {
        status : false,
        text : "",
        saveData : {},
        data : {}
    };

    var reponseFilmAdd = {
        status : false,
        text : "",
        data : {}
    };
    
    var reponseFilmEdit = {
        status : false,
        text : "",
        data : {}
    };

    // Session Pour ajout FAQ
    if (!req.session.reponseFAQAdd) {
        req.session.reponseFAQAdd = reponseFAQAdd;
    }
    
    // Session Pour modifier FAQ
    if (!req.session.reponseFaqEdit) {
        req.session.reponseFaqEdit = reponseFaqEdit;
    }

    // Session Pour ajout d'un film
    if (!req.session.reponseFilmAdd) {
        req.session.reponseFilmAdd = reponseFilmAdd;
    }

    // Session Pour modifier un film
    if (!req.session.reponseFilmEdit) {
        req.session.reponseFilmEdit = reponseFilmEdit;
    }
    
    console.log("req.session.reponseFAQAdd", req.session.reponseFAQAdd);
    console.log("req.session.reponseFaqEdit", req.session.reponseFaqEdit);
    console.log("req.session.reponseFilmAdd", req.session.reponseFilmAdd);
    console.log("req.session.reponseFilmEdit", req.session.reponseFilmEdit);

  res.render('./pages/index', { online: req.session.user, title: 'Film 2022 - Acceuil'});
});


/* GET panel-film page. */
router.get('/panel-film', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    res.render('./pages/panel-film', { online: req.session.user, title: 'Film 2022 - Panel Film' });
});

/* GET panel-film-add page. */
router.get('/panel-film-add', function(req, res, next) {
    // //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    console.log("req.session.reponseFilmAdd", req.session.reponseFilmAdd);
    res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
});

//Route pour enregistrer une nouvelle FAQ.
router.post('/film/add', async function(req, res, next) {

    // console.log("req.body", req.body);

    //Stockage des données reçus du front
    var filmDataAdd = {
        name: req.body.name,
        file : req.files,
        url_alloCine : req.body.url_alloCine,
        note_alloCine: req.body.note_alloCine,
        url_senscritique : req.body.url_senscritique,
        note_senscritique: req.body.note_senscritique,
        url_cineserie : req.body.url_cineserie,
        note_cineserie: req.body.note_cineserie,
        url_source : req.body.url_source,
        descriptions : req.body.descriptions
    };
    
    // var filmDataAdd = req.body;
    console.log("filmDataAdd", filmDataAdd);

    if (req.body.name === ""){
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer un nom de film";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer un nom de film");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (req.files == null) {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une image";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une image");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (req.body.url_alloCine === "") {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une url pour allocine";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une url pour allocine");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (!req.body.url_alloCine == undefined && regex.url_verif(req.body.url_alloCine) == false) {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une url correct pour allocine";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une url correct pour allocine");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (req.body.note_alloCine === "") {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une note pour allocine";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une note pour allocine");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (req.body.url_senscritique === "") {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une url pour senscritique";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une url pour senscritique");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (!req.body.url_senscritique == undefined && regex.url_verif(req.body.url_senscritique) == false) {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une url correct pour senscritique";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une url correct pour senscritique");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (req.body.note_senscritique === "") {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une note pour senscritique";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une note pour senscritique");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (req.body.url_cineserie === "") {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une url pour cineserie";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une url pour cineserie");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (!req.body.url_cineserie == undefined && regex.url_verif(req.body.url_cineserie) == false) {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une url correct pour cineserie";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une url correct pour cineserie");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (req.body.note_cineserie === "") {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une note pour cineserie";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une note pour cineserie");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (req.body.url_source === "") {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une url pour la source";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une url pour la source");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (regex.url_verif(req.body.url_source) == false) {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une url correct pour la source";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une url correct pour la source");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else if (req.body.descriptions === "") {
        req.session.reponseFilmAdd.status = true;
        req.session.reponseFilmAdd.text = "Merci d'insérer une descriptions du film";
        req.session.reponseFilmAdd.data = filmDataAdd;
        console.log("Merci d'insérer une descriptions du film");
        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else {        
        var result = await upload_img.upload_img_local(req.files.file);
        if(result == false) {
            req.session.reponseFilmAdd.status = true;
            req.session.reponseFilmAdd.text = "Erreur interne impossible de sauvegarder l'image sur notre serveur.";
            req.session.reponseFilmAdd.data = filmDataAdd;
            console.log("Erreur interne impossible de sauvegarder l'image sur notre serveur.");
            res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
        } else {
    
            // console.log(imagePath);
            var resultCloudinary = await upload_img.upload_img_cloudinary(result, "film2022");
            console.log("resultCloudinary", resultCloudinary);
    
            if (resultCloudinary == false) {
                req.session.reponseFilmAdd.status = true;
                req.session.reponseFilmAdd.text = "Erreur interne impossible de sauvegarder l'image sur notre hébergeur.";
                req.session.reponseFilmAdd.data = filmDataAdd;
                console.log("Erreur interne impossible de sauvegarder l'image sur notre hébergeur.");
                var resultLocalDel = await upload_img.upload_img_local_del(result);
                if (resultLocalDel == false) {
                    req.session.reponseFilmAdd.status = true;
                    req.session.reponseFilmAdd.text = "Erreur interne impossible de supprimer l'image sur notre serveur.";
                    req.session.reponseFilmAdd.data = filmDataAdd;
                    console.log("Erreur interne impossible de supprimer l'image sur notre serveur.");
                    res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
                } 
            } else {
                var resultLocalDel = await upload_img.upload_img_local_del(result);
                // console.log("resultLocalDel", resultLocalDel);
                if (resultLocalDel == false) {
                    req.session.reponseFilmAdd.status = true;
                    req.session.reponseFilmAdd.text = "Erreur interne impossible de supprimer l'image sur notre serveur.";
                    req.session.reponseFilmAdd.data = filmDataAdd;
                    console.log("Erreur interne impossible de supprimer l'image sur notre serveur.");
                    // On delete l'image sur l'hébergeur en cas d'erreur interne 
                    var deleteCloudinaryImage = await upload_img.upload_img_cloudinary_del(resultCloudinary.public_id);
                    console.log("deleteCloudinaryImage", deleteCloudinaryImage);
                    res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
                } else {
                    console.log("req.body", req.body);
                    console.log("resultCloudinary", resultCloudinary.public_id);
                    // console.log("JE SUIS L0 §§§§§§§§§§§§§§§§§§");
                    // res.render('./pages/panel-film', { online: req.session.user, title: 'Film 2022 - Panel Film Add'});
                    
                    //On regarde dans la BDD si el film existe déjà
                    FILM.findOne({
                        name: req.body.name
                    }).then(async film => {
                        //Si on le trouve on envoie un message d'erreur
                        if (film) {
                            req.session.reponseFilmAdd.status = true;
                            req.session.reponseFilmAdd.text = "Le film" + req.body.name +  " existe déjà dans notre bdd !";
                            req.session.reponseFilmAdd.data = filmDataAdd;
                            res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
                            //Sinon on ajoute dans la bdd
                        } else {
                            var FilmSave ={
                                name: req.body.name,
                                img : resultCloudinary.secure_url,
                                public_id : resultCloudinary.public_id,
                                url_alloCine : req.body.url_alloCine,
                                note_alloCine: req.body.note_alloCine,
                                url_senscritique : req.body.url_senscritique,
                                note_senscritique: req.body.note_senscritique,
                                url_cineserie : req.body.url_cineserie,
                                note_cineserie: req.body.note_cineserie,
                                url_source : req.body.url_source,
                                descriptions : req.body.descriptions
                            };

                            console.log("FilmSave", FilmSave);
                            
                            //Création du document FAQ
                            FILM.create(FilmSave)
                            .then(film => {
                                console.log("FILM", film);
                                // return res.redirect("/panel-film");
                            })
                            //Si il y a une erreur
                            .catch(async err => {
                                console.log("err", err);
                                req.session.reponseFilmAdd.status = true;
                                req.session.reponseFilmAdd.text = "Le film" + req.body.name +  " existe déjà dans notre bdd !";
                                req.session.reponseFilmAdd.data = filmDataAdd;
                                // On delete l'image sur l'hébergeur en cas d'erreur interne 
                                var deleteCloudinaryImage = await upload_img.upload_img_cloudinary_del(resultCloudinary.public_id);
                                console.log("deleteCloudinaryImage", deleteCloudinaryImage);
                                res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
                            });
                            res.redirect("/panel-film");
                        }
                    //En cas d'erreur
                    }).catch(err => {
                        console.log("err", err);
                        console.log("Erreur interne impossible faire la recherche du film dans la bdd");
                        req.session.reponseFilmAdd.status = true;
                        req.session.reponseFilmAdd.text = "Erreur interne impossible faire la recherche du film dans la bdd";
                        req.session.reponseFilmAdd.data = filmDataAdd;
                        res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Admin', filmADD: req.session.reponseFilmAdd});
                    });
                }
            }
        }   
    }
    // console.log("url_alloCine", req.body.url_alloCine);


    // var resultCloudinary = await cloudinary.cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Google_Images_2015_logo.svg/1200px-Google_Images_2015_logo.svg.png", {folder: "Film2022",});
    // res.json(resultCloudinary);
    //Stockage des données reçus du front
    // var faqDataAdd  = {
    //     quest: req.body.quest,
    //     response: req.body.response,
    // };
    // console.log("/faq/add Après ---> req.session.faq", req.session.reponseFAQAdd);
    // if (req.body.quest === "") {
        // req.session.reponseFAQAdd.status = true;
        // req.session.reponseFAQAdd.text = "Merci d'insérer votre question !";
    //     req.session.reponseFAQAdd.data.quest = req.body.quest;
    //     req.session.reponseFAQAdd.data.response = req.body.response;
    //     // reponseFAQAdd.data = faqDataAdd;
    //     res.redirect("/panel-faq-add");
    // } else if (req.body.response === "") {
    //     req.session.reponseFAQAdd.status = true;
    //     req.session.reponseFAQAdd.text = "Merci d'insérer votre réponse !";
    //     req.session.reponseFAQAdd.data.quest = req.body.quest;
    //     req.session.reponseFAQAdd.data.response = req.body.response;
    //     // reponseFAQAdd.data = faqDataAdd;
    //     res.redirect("/panel-faq-add");
    // } else {

    //     //Création du document FAQ
    //     FAQ.create(faqDataAdd)
    //         .then(faq => {
    //             console.log("FAQ", faq);
    //             return res.redirect('/panel-faq');
    //         })
    //         //Si il y a une erreur
    //         .catch(err => {
    //             console.log("err", err);
    //             req.session.reponseFAQAdd.status = true;
    //             req.session.reponseFAQAdd.text = "Erreur interne !";
    //             req.session.reponseFAQAdd.data = faqDataAdd;
    //             res.render('./pages/panel-faq-add ', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', faqADD: req.session.reponseFAQAdd});
    //     });
    // }
});

/* GET panel-film-edit page. */
router.get('/panel-film-edit', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film' });
});


//Route pour suprimer un messaage de contact.
router.post('/film/del/:id', function(req, res, next) {
    console.log("id", req.params.id);
    CONTACT.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            console.log("Impossible de suprimer le film: ", err);
            res.redirect('/panel-film');
        } else {
            console.log('Le film à était suprimer à succès !', doc);
            res.redirect('/panel-film');
        }
    });
});

// ------------------------------ FIN ROUTE Film  ---------------------------

// ------------------------------ Début ROUTE Contact ---------------------------

/* GET contact page. */
router.get('/contact', function(req, res, next) {
    reponseContactAdd.status = false;
    reponseContactAdd.text = "";
    reponseContactAdd.data = {};
    res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - contact' , reponseContactAdd });
});
  
/* GET panel-contact page. */
router.get('/panel-contact', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    // On cherche dans la base de donnée
    CONTACT.find().then(async contact => {
        if (contact.length == 0) {
            reponseContactView.status =  false;
            reponseContactView.text = "Aucun message de contact se trouve dans la base de données !";
            reponseContactView.data = contact;
            res.render('./pages/panel-contact', { online: req.session.user, title: 'Film 2022 - Panel Contact', reponseContactView});
        } else {
            reponseContactView.status =  true;
            reponseContactView.text = "Listes contact trouver !";
            reponseContactView.data = contact;
            res.render('./pages/panel-contact', { online: req.session.user, title: 'Film 2022 - Panel Contact', reponseContactView});
        }
    }).catch(err => {
        console.log('/panel-contact err', err);
        reponseContactView.status =  false;
        reponseContactView.text = "Impossible de récupérer les messages de contact dans la base de données !";
        reponseContactView.data = {};
        res.render('./pages/panel-contact', { online: req.session.user, title: 'Film 2022 - Panel FAQ', reponseContactView});
    });
});

//Route création d'un contact.
router.post('/contact/add', function(req, res, next) {

    //Stockage des données reçus du front
    var contactDataAdd = {
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email : req.body.email,
        message : req.body.message,
    };

    if (req.body.lastname === "") {
        reponseContactAdd.status = true;
        reponseContactAdd.text = "Merci d'insérer votre Nom !";
        reponseContactAdd.data = contactDataAdd;
        res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - Panel Contact', reponseContactAdd });
    } else if (req.body.firstname === "") {
        reponseContactAdd.status = true;
        reponseContactAdd.text = "Merci d'insérer votre prénom !";
        reponseContactAdd.data = contactDataAdd;
        res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - Panel Contact', reponseContactAdd });
    } else if (req.body.email === "") {
        reponseContactAdd.status = true;
        reponseContactAdd.text = "Merci d'insérer votre email !";
        reponseContactAdd.data = contactDataAdd;
        res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - Panel Contact', reponseContactAdd });
    } else if (req.body.message === "") {
        reponseContactAdd.status = true;
        reponseContactAdd.text = "Merci d'insérer votre message !";
        reponseContactAdd.data = contactDataAdd;
        res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - Panel Contact', reponseContactAdd });
    } else {
        // ^[a-zA-Z-]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$#
        // var regex = /^[a-zA-Z-]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$#;
        var regex = /\+|\*|\$|^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/gi;
        var isExisting = regex.test(req.body.email);
        if (!isExisting) {
            reponseContactAdd.status = true;
            reponseContactAdd.text = "Merci d'insérer un email correct !";
            reponseContactAdd.data = contactDataAdd;
            res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - Panel Contact', reponseContactAdd });
        } else {
            //Création du document FAQ
            CONTACT.create(contactDataAdd)
                .then(contact => {
                    console.log("CONTACT", contact);
                    return res.redirect('/');
                })
                //Si il y a une erreur
                .catch(err => {
                    console.log("err", err);
                    // console.log("err 2", err.errors.properties);
                    reponseContactAdd.status = true;
                    reponseContactAdd.text = err;
                    reponseContactAdd.data = contactDataAdd;
                    res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', reponseContactAdd});
            });
        }
    }
});

//Route pour suprimer un messaage de contact.
router.post('/contact/del/:id', function(req, res, next) {
    console.log("id", req.params.id);
    CONTACT.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            console.log("Impossible de suprimer le message de contact : ", err);
            res.redirect('/panel-contact');
        } else {
            console.log('La message de contact à était suprimer à succès !', doc);
            res.redirect('/panel-contact');
        }
    });
});

// ------------------------------ Fin ROUTE Contact ---------------------------

// ------------------------------ Début ROUTE FAQ ---------------------------

/* GET faq page. */
router.get('/faq', function(req, res, next) {
    FAQ.find().then(faq => {
        if (faq.length == 0) {
            reponseFAQView.status =  false;
            reponseFAQView.text = "Aucune FAQ se trouve dans la base de données !";
            reponseFAQView.data = faq;
            res.render('./pages/faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', reponseFAQView});
        } else {
            reponseFAQView.status =  true;
            reponseFAQView.text = "Listes FAQ trouver !";
            reponseFAQView.data = faq;
            res.render('./pages/faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', reponseFAQView});
        }
    }).catch(err => {
        reponseFAQView.status =  false;
        reponseFAQView.text = "Impossible de récupérer les faqs dans la base de données !";
        reponseFAQView.data = err;
        res.render('./pages/faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', reponseFAQView});
    });
});

/* GET panel-faq page. */
router.get('/panel-faq', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    
    // // Param add faq
    // var reponseFAQAdd = { 
    //     status : false,
    //     text : "",
    //     data : {}
    // };

    // // Param Edit faq;
    // var reponseFaqEdit = {
    //     status : false,
    //     text : "",
    //     saveData : {},
    //     data : {}
    // };

    // // Session Pour ajout FAQ
    // if (!req.session.reponseFAQAdd) {
    //     req.session.reponseFAQAdd = reponseFAQAdd;
    // }
    
    // // Session Pour modifier FAQ
    // if (!req.session.reponseFaqEdit) {
    //     req.session.reponseFaqEdit = reponseFaqEdit;
    // }
        
    // On cherche dans la base de donnée
    FAQ.find().then(async faq => {
        if (faq.length == 0) {
            reponseFAQView.status =  false;
            reponseFAQView.text = "Aucune FAQ se trouve dans la base de données !";
            reponseFAQView.data = faq;
            res.render('./pages/panel-faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', reponseFAQView});
        } else {
            reponseFAQView.status =  true;
            reponseFAQView.text = "Listes FAQ trouver !";
            reponseFAQView.data = faq;
            res.render('./pages/panel-faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', reponseFAQView});
        }
    }).catch(err => {
        console.log('/panel-faq err', err);
        reponseFAQView.status =  false;
        reponseFAQView.text = "Impossible de récupérer les faqs dans la base de données !";
        reponseFAQView.data = {};
        res.render('./pages/panel-faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', reponseFAQView});
    });
});

/* GET panel-faq-add page. */
router.get('/panel-faq-add', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }

    res.render('./pages/panel-faq-add', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', faqADD: req.session.reponseFAQAdd});
});

//Route pour enregistrer une nouvelle FAQ.
router.post('/faq/add', function(req, res, next) {

    // // Session Pour ajout FAQ
    // req.session.reponseFAQAdd = reponseFAQAdd;
    console.log("/faq/add Avant ---> req.session.faq", req.session.reponseFAQAdd);
    //Stockage des données reçus du front
    var faqDataAdd  = {
        quest: req.body.quest,
        response: req.body.response,
    };
    console.log("/faq/add Après ---> req.session.faq", req.session.reponseFAQAdd);
    if (req.body.quest === "") {
        req.session.reponseFAQAdd.status = true;
        req.session.reponseFAQAdd.text = "Merci d'insérer votre question !";
        req.session.reponseFAQAdd.data.quest = req.body.quest;
        req.session.reponseFAQAdd.data.response = req.body.response;
        // reponseFAQAdd.data = faqDataAdd;
        res.redirect("/panel-faq-add");
    } else if (req.body.response === "") {
        req.session.reponseFAQAdd.status = true;
        req.session.reponseFAQAdd.text = "Merci d'insérer votre réponse !";
        req.session.reponseFAQAdd.data.quest = req.body.quest;
        req.session.reponseFAQAdd.data.response = req.body.response;
        // reponseFAQAdd.data = faqDataAdd;
        res.redirect("/panel-faq-add");
    } else {

        //Création du document FAQ
        FAQ.create(faqDataAdd)
            .then(faq => {
                console.log("FAQ", faq);
                return res.redirect('/panel-faq');
            })
            //Si il y a une erreur
            .catch(err => {
                console.log("err", err);
                req.session.reponseFAQAdd.status = true;
                req.session.reponseFAQAdd.text = "Erreur interne !";
                req.session.reponseFAQAdd.data = faqDataAdd;
                res.render('./pages/panel-faq-add', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', faqADD: req.session.reponseFAQAdd});
        });
    }
});

/* GET panel-faq-edit page. */
router.get('/panel-faq-edit/:id', function(req, res, next) {

    console.log("id", req.params.id);

    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }

    FAQ.findById({
        _id: req.params.id,
    }).then(async faq => {

        // On met la data dans un objet 
        req.session.reponseFaqEdit.data = faq;

        // Condition de check pour savoir c'est le bon edit de l'id qu'on fait 
        if (req.session.reponseFaqEdit.data._id == req.session.reponseFaqEdit.saveData._id) {
            res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier', faqEdit: req.session.reponseFaqEdit});
        } else {
            // On met par défault les param edit
            req.session.reponseFaqEdit.status = false;
            req.session.reponseFaqEdit.text = "";
            req.session.reponseFaqEdit.saveData = {};
            res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier', faqEdit: req.session.reponseFaqEdit});
        }
    //En cas d'erreur on sort leport 500
    }).catch(err => {
        console.log("/faq/edit err", err);
        res.render('./pages/panel-faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier', faqEdit: req.session.reponseFaqEdit});
    });
    
});

// Route redirection si l'utilisateur est en cours d'une modification de faq
router.get('/panel-faq-edit', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }

    // Redirection  à la modification en cours ou sinon au panel faq
    // Object.key vérifier si l'objet est vide ou pas
    if (Object.keys(req.session.reponseFaqEdit.data).length === 0) {
        res.redirect("/panel-faq");
    } else {
        // On met par défault les param edit
        req.session.reponseFaqEdit.status = false;
        req.session.reponseFaqEdit.text = "";
        req.session.reponseFaqEdit.saveData = {};
        res.redirect(`/panel-faq-edit/${req.session.reponseFaqEdit.data._id}`);
    }

});


//Route pour modifier une FAQ.
router.post('/faq/edit/:id', function(req, res, next) {

    //Stockage des données reçus du front
    var faqDataEdit = {
        _id : req.params.id,
        quest: req.body.quest,
        response: req.body.response,
    };

    if (req.body.quest === "") {
        req.session.reponseFaqEdit.status = true;
        req.session.reponseFaqEdit.text = "Merci d'insérer votre question !";
        req.session.reponseFaqEdit.saveData = faqDataEdit;
        res.redirect(`/panel-faq-edit/${req.session.reponseFaqEdit.data._id}`);
    } else if (req.body.response === "") {
        req.session.reponseFaqEdit.status = true;
        req.session. reponseFaqEdit.text = "Merci d'insérer votre réponse !";
        req.session.reponseFaqEdit.saveData = faqDataEdit;
        res.redirect(`/panel-faq-edit/${req.session.reponseFaqEdit.data._id}`);
    } else {

        //Création du document FAQ
        FAQ.update({ _id : req.params.id}, faqDataEdit)
            .then(faq => {
                console.log("FAQ", faq);
                return res.redirect('/panel-faq');
            })
            //Si il y a une erreur
            .catch(err => {
                console.log("err", err);
                req.session.reponseFaqEdit.status = true;
                req.session.reponseFaqEdit.text = "Erreur interne !";
                req.session.reponseFaqEdit.saveData = faqDataEdit;
                res.render('./pages/panel-faq-add', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', faqEdit: req.session.reponseFaqEdit});
        });
    }
});

//Route pour suprimer une faq.
router.post('/faq/del/:id', function(req, res, next) {
    console.log("id", req.params.id);
    FAQ.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            console.log("Impossible de suprimer la faq : ", err);
            res.redirect('/panel-faq');
        } else {
            console.log('La faq à était suprimer à succès!', doc);
            res.redirect('/panel-faq');
        }
    });
});

// ------------------------------ FIN ROUTE FAQ ---------------------------

// ------------------------------ Début ROUTE Système connexion ---------------------------

/* GET login */
router.get('/login', function(req, res, next) {
    reponseUserLogin.status = true;
    reponseUserLogin.text = "";
    res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Panel Admin', reponseUserLogin});
});

//Route pour enregistrer un nouveau compte.
router.post('/user/signup', function(req, res, next) {

    console.log("req.body.username",req.body);
    //Vérification de tous les informations sois là à la request
    if (req.body.username == "" || req.body.username == undefined) {
        res.json({
            "text" : "Merci d'indiquer un username !",
            "code" : 403
        });
    }else if (req.body.email === "" || req.body.username == undefined){
        res.json({
            "text" : "Merci d'indiquer un email !",
            "code" : 403
        });
    }else if (req.body.password === "" || req.body.username == undefined) {
        res.json({
            "text" : "Merci d'indiquer un mot de passe !",
            "code" : 403
        });
    } else {
    //Création du sel
    var salt = uid2(32);

    //Stockage des données reçus du front
    var userData  = {
        username: req.body.username, // Username
        salt: salt,//Pour le déchiffrage mdp
        email: req.body.email, // email
        password : CryptoJS.AES.encrypt(req.body.password, salt).toString(),//MDP crypté
    };

    //Recherche dans la BDD 
    User.findOne({
        //Précision de la recherche pour l'email.
        email: req.body.email,
    })
        .then(email => {
            //Si l'email n'existe pas on le créer sinon on le créer pas et on r'envois un message d'erreur.
            if (!email) {
                //Recherche dans la BDD 
                User.findOne({
                    //Précision de la recherche pour l'username.
                    username: req.body.username,
                })
                    .then(user => {
                        console.log("User", user)
                        //Si l'username n'existe pas on le créer sinon on le créer pas et on r'envois un message d'erreur.
                        if (!user) {
                                //Création du document de l'user
                                User.create(userData)
                                    .then(user => {
                                        res.json({
                                            "text" : "Bienvenue " + user.username + " !",
                                            "token" : user.getToken(),
                                            "user": user,
                                        })
                                    })
                                    //Si il y a une erreur
                                    .catch(err => {
                                        console.log("/user/signup ERR (Create User)", err)
                                        res.status(500).json({
                                            "text" : "Erreur Interne !",
                                            "code" : 500
                                        });
                                    })
                        //Si l'utilisateur existe déjà
                        } else {
                            res.json({
                                "text" : "L'utilisateur " + user.username + " existe déjà !",
                                "code" : 403
                        });
                        }
                    })
                    //En cas d'erreur
                    .catch(err => {
                        console.log("/user/signup ERR (Interne)", err);
                        res.status(500).json({
                            "text" : "Erreur Interne !",
                            "code" : 500
                        });
                    })
            //Si l'adresse email existe déjà
            } else {
                res.json({
                    "text" : "L'email " + email.email + " existe déjà !",
                    "code" : 404
                })
            }
        //En cas d'erreur
        })
    .catch(err => {
        console.log("/user/signup ERR (Interne)", err);
        res.status(500).json({
            "text" : "Erreur Interne !",
            "code" : 500
        });
    })
    }

});

//Route pour la connexion.
router.post('/user/login', function(req, res, next) {

    if (req.body.username === "") {
        reponseUserLogin.status = false;
        reponseUserLogin.text = "Merci d'insérer votre identifiant !";
        res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Panel Admin', reponseUserLogin});
    } else if (req.body.password === ""){
        reponseUserLogin.status = false;
        reponseUserLogin.text = "Merci d'insérer votre mot de passe !";
        res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Panel Admin', reponseUserLogin});
    }else {
        console.log("req username", req.body);
        //On regarde dans la BDD si l'username existe bien.
        User.findOne({
            username: req.body.username
        }).then(async user => {
            console.log("Doonée de l'utilisateur à la connexion :", user);
            //Si on ne touve pas l'username on r'envois erreur 401
            if (!user) {
                reponseUserLogin.status = false;
                reponseUserLogin.text = "L'utilisateur " + req.body.username +  " n'existe pas !";
                res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Panel Admin', reponseUserLogin});
                //Si l'username est trouvé + le passwoard est correct on lui donne le token
            } else {
                var bytes  = CryptoJS.AES.decrypt(user.password, user.salt);
                var hash = bytes.toString(CryptoJS.enc.Utf8);
                if (hash === req.body.password) {
                    console.log("Hello " + user.email + " !");
                    req.session.user = user;
                    console.log('MON LOG REQ.SESSION USER', user);
                    console.log("req.session.user.online avant", req.session.user.online);
                    req.session.user.online = true;
                    console.log("req.session.user.online après", req.session.user.online);
                    return res.redirect('/');
                    //Si l'username est trouvé mais le password est incorrect on lui envois l'erreur 402.
                } else {
                    reponseUserLogin.status = false;
                    reponseUserLogin.text = "Mot de passe incorrect !";
                    res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Panel Admin', reponseUserLogin});
                }
            }
        //En cas d'erreur
        }).catch(err => {
            console.log("/user/login ERR (Login (Interne))", err);
            reponseUserLogin.status = false;
            reponseUserLogin.text = "Erreur Interne !";
            res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Panel Admin', reponseUserLogin});
        })
    }
});

// GET Syntax Logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                console.log("TON LOG DE ERREUR !!! ====>");
                return next(err);
            } else {
                console.log("C EST TOUT BON !!! ===>");
                return res.redirect('/');
            }
        });
    }
});

// ------------------------------ FIN ROUTE Système connexion ---------------------------

module.exports = router;
