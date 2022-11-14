var express = require('express');
var router = express.Router();

// Validation Faq
const validation_faq = require("../function/validation/faq.js");

//Query Faq 
const query_faq = require("../query/faq.js");

//Query Contact
const query_contact = require("../query/contact.js");

// Validation Film
const validation_film = require("../function/validation/film.js");

//Query Film
const query_film = require("../query/film.js");

// les Function upload img
var upload_img = require('../function/upload_img.js');

// ------------------------------ Début ROUTE ADMIN FILM ---------------------------

/* GET panel-film page. */
router.get('/film', async function(req, res, next) {

    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    // Reponse la bdd
    var reponseFimviewBDD = await query_film.viewFilm();
    return res.render('./pages/panel-film', { online: req.session.user, title: 'Film 2022 - Panel Film', reponseFilmView : reponseFimviewBDD});
});

/* GET panel-film-add page. */
router.get('/film-add', function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    return res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
});

//Route pour enregistrer une nouvelle FAQ.
router.post('/film-add', async function(req, res, next) {

    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");

    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    
    // Param body 
    var FilmSave = {
        name: req.body.name,
        img : req.files,
        url_alloCine : req.body.url_alloCine,
        note_alloCine: req.body.note_alloCine,
        url_senscritique : req.body.url_senscritique,
        note_senscritique: req.body.note_senscritique,
        url_cineserie : req.body.url_cineserie,
        note_cineserie: req.body.note_cineserie,
        url_source : req.body.url_source,
        descriptions : req.body.descriptions
    };

    // Réponse Vérification des formats de données du front 
    var validationFilmADD = await validation_film.validationFilmADD(FilmSave);
    if (!validationFilmADD.status){
        req.session.reponseFilmAdd.status = validationFilmADD.status;
        req.session.reponseFilmAdd.text = validationFilmADD.text;
        req.session.reponseFilmAdd.data = validationFilmADD.data;
        return res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
    } else {    
        // Réponse Téléchargement de l'image sur notre serveur
        var resultUpdateImageLocal = await upload_img.upload_img_local(FilmSave.img.file);
        console.log("resultUpdateImageLocal",resultUpdateImageLocal);
        if(!resultUpdateImageLocal.status) {
            req.session.reponseFilmAdd.status = resultUpdateImageLocal.status;
            req.session.reponseFilmAdd.text = resultUpdateImageLocal.text;
            req.session.reponseFilmAdd.data = FilmSave;
            return res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
        } else {
            // Réponse Téléchargement de l'image sur l'hébergement
            var resultUpdateImageCloud = await upload_img.upload_img_cloudinary(resultUpdateImageLocal.data, "film2022");
            FilmSave.img = resultUpdateImageCloud.data.secure_url;
            FilmSave.public_id = resultUpdateImageCloud.data.public_id;
            if (!resultUpdateImageCloud.status) {
                req.session.reponseFilmAdd.status = resultUpdateImageCloud.status;
                req.session.reponseFilmAdd.text = resultUpdateImageCloud.text;
                req.session.reponseFilmAdd.data = FilmSave;
                // Réponse Supression de l'image sur le serveur en cas d'erreur
                var resultLocalDelLocalErreurCloud = await upload_img.del_img_local(resultUpdateImageCloud.data.original_filename);
                return resultLocalDelLocalErreurCloud, res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
            } else {
                // Réponse Supression de l'image sur notre serveur
                var resultLocalDel = await upload_img.del_img_local(resultUpdateImageCloud.data.original_filename);
                if (!resultLocalDel.status) {
                    req.session.reponseFilmAdd.status = resultLocalDel.status;
                    req.session.reponseFilmAdd.text = resultLocalDel.text;
                    req.session.reponseFilmAdd.data = FilmSave;
                    return res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
                } else {
                    // Réponse Recherche du nom du film
                    var searchFilmNameBdd = await query_film.viewFilmName(req.body.name);
                    if (!searchFilmNameBdd.status){
                        req.session.reponseFilmAdd.status = searchFilmNameBdd.status;
                        req.session.reponseFilmAdd.text = searchFilmNameBdd.text;
                        req.session.reponseFilmAdd.data = FilmSave;
                        return res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
                    } else {
                        // Réponse création du film
                        var createFilmBdd = await query_film.addFilm(FilmSave);

                        if (!createFilmBdd.status){
                            req.session.reponseFilmAdd.status = createFilmBdd.status;
                            req.session.reponseFilmAdd.text = createFilmBdd.text;
                            req.session.reponseFilmAdd.data = FilmSave;
                            // Réponse supression de l'image sur l'hébergeur  en cas d'erreur
                            var deleteUploadImgCloudifary = await upload_img.del_img_cloudinary(FilmSave.public_id);
                            if (deleteUploadImgCloudifary.status){
                                return res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
                            } else {
                                return res.render('./pages/panel-film-add', { online: req.session.user, title: 'Film 2022 - Panel Film Add', filmADD: req.session.reponseFilmAdd});
                            }
                        } else {
                            return res.redirect("/admin/film");
                        }
                    }
                }
            }
        } 
    }
});

/* GET panel-film-edit page. */
router.get('/film-edit/:id', async function(req, res, next) {

    //Vérification si l'admin eest connecter
    if (!req.session.user) return res.redirect("/");
    
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");

    var reponseFilmEdit = await query_film.viewFilmId(req);

    if (!reponseFilmEdit.status) {
        req.session.reponseFilmEdit.status = reponseFilmEdit.status;
        req.session.reponseFilmEdit.text = reponseFilmEdit.text;
        req.session.reponseFilmEdit.saveData = reponseFilmEdit.data;
        console.log("req.session.reponseFilmEdit", req.session.reponseFilmEdit);
        return res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
    } else {
        req.session.reponseFilmEdit.data = reponseFilmEdit.data;
        if (req.session.reponseFilmEdit.data._id == req.session.reponseFilmEdit.saveData._id) {
            return res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
        } else {
            // On met par défault les param edit
            req.session.reponseFilmEdit.status = true;
            req.session.reponseFilmEdit.text = "";
            req.session.reponseFilmEdit.saveData = {};
            return res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
        }
    }
});

/* GET panel-film-edit page. */
router.get('/film-edit', function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");

    // Redirection  à la modification en cours ou sinon au panel faq
    // Object.key vérifier si l'objet est vide ou pas
    if (Object.keys(req.session.reponseFilmEdit.data).length === 0) {
        return res.redirect("/admin/film");
    } else {
        // On met par défault les param edit
        req.session.reponseFilmEdit.status = false;
        req.session.reponseFilmEdit.text = "";
        req.session.reponseFilmEdit.saveData = {};
        return res.redirect(`/admin/film-edit/${req.session.reponseFilmEdit.data._id}`);
    }
});

//Route pour enregistrer une nouvelle FAQ.
router.post('/film-edit/:id', async function(req, res, next) {

    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");

    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");

    var FilmEdit = {
        name: req.body.name,
        url_alloCine : req.body.url_alloCine,
        note_alloCine: req.body.note_alloCine,
        url_senscritique : req.body.url_senscritique,
        note_senscritique: req.body.note_senscritique,
        url_cineserie : req.body.url_cineserie,
        note_cineserie: req.body.note_cineserie,
        url_source : req.body.url_source,
        descriptions : req.body.descriptions
    };

    var delImageOld = {};

    var validationFilmEdit = await validation_film.validationFilmEdit(FilmEdit);
    if(!validationFilmEdit.status) {
        req.session.reponseFilmEdit.status = validationFilmEdit.status;
        req.session.reponseFilmEdit.text = validationFilmEdit.text;
        req.session.reponseFilmEdit.data = validationFilmEdit.data;
        return res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
    } else {
        if (req.files == null) {
            var reponseFilmEdit = await query_film.editFilm(req, FilmEdit);
            console.log("reponseFilmEdit", reponseFilmEdit);
            if (!reponseFilmEdit.status) {
                req.session.reponseFilmEdit.status = reponseFilmEdit.status;
                req.session.reponseFilmEdit.text = reponseFilmEdit.text;
                req.session.reponseFilmEdit.data = reponseFilmEdit.data;
                return res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
            } else {
                return res.redirect("/admin/film");
            }
        } else {
            var resultUpdateImageLocal = await upload_img.upload_img_local(req.files.file);
            console.log("resultUpdateImageLocal",resultUpdateImageLocal);
            if(!resultUpdateImageLocal.status) {
                req.session.reponseFilmEdit.status = resultUpdateImageLocal.status;
                req.session.reponseFilmEdit.text = resultUpdateImageLocal.text;
                req.session.reponseFilmEdit.data = FilmEdit;
                console.log("req.session.reponseFilmEdit", req.session.reponseFilmEdit);
                return res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
            } else {
                var resultUpdateImageCloud = await upload_img.upload_img_cloudinary(resultUpdateImageLocal.data, "film2022");
                console.log("resultUpdateImageCloud",resultUpdateImageCloud);
                FilmEdit.img = resultUpdateImageCloud.data.secure_url;
                FilmEdit.public_id = resultUpdateImageCloud.data.public_id;
                if (!resultUpdateImageCloud.status) {
                    req.session.reponseFilmEdit.status = resultUpdateImageCloud.status;
                    req.session.reponseFilmEdit.text = resultUpdateImageCloud.text;
                    req.session.reponseFilmEdit.data = FilmEdit;
                    var resultLocalDelLocalErreurCloud = await upload_img.del_img_local(resultUpdateImageCloud.data.original_filename);
                    return resultLocalDelLocalErreurCloud, res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
                } else {
                    var resultLocalDel = await upload_img.del_img_local(resultUpdateImageCloud.data.original_filename);
                    console.log("resultLocalDel",resultLocalDel);
                    if (!resultLocalDel.status) {
                        req.session.reponseFilmEdit.status = resultLocalDel.status;
                        req.session.reponseFilmEdit.text = resultLocalDel.text;
                        req.session.reponseFilmEdit.data = FilmEdit;
                        return res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
                    } else {
                        var searchIdFilmEdit = await query_film.viewFilmId(req);
                        delImageOld.public_id = searchIdFilmEdit.data.public_id;
                        console.log('delImageOld juste après searchIdFilmEdit', delImageOld);
                        console.log("searchIdFilmEdit", searchIdFilmEdit);
                        if (!searchIdFilmEdit.status) {
                            req.session.reponseFilmEdit.status = searchIdFilmEdit.status;
                            req.session.reponseFilmEdit.text = searchIdFilmEdit.text;
                            req.session.reponseFilmEdit.data = FilmEdit;
                            var deleteUploadImgCloudifary = await upload_img.del_img_cloudinary(FilmEdit.public_id);
                            return deleteUploadImgCloudifary, res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
                        } else {
                            console.log("je suis dans else après searchIdFilmEdit");
                            var reponseFilmEditEditImage = await query_film.editFilm(req, FilmEdit);
                            console.log("reponseFilmEdit", reponseFilmEditEditImage);
                            if (!reponseFilmEditEditImage.status) {
                                req.session.reponseFilmEdit.status = reponseFilmEditEditImage.status;
                                req.session.reponseFilmEdit.text = reponseFilmEditEditImage.text;
                                req.session.reponseFilmEdit.data = reponseFilmEditEditImage.data;
                                return res.render('./pages/panel-film-edit', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier', filmEdit: req.session.reponseFilmEdit});
                            } else {
                                console.log('delImageOld', delImageOld);
                                var deleteUploadImgCloudifaryOld = await upload_img.del_img_cloudinary(delImageOld.public_id);
                                return deleteUploadImgCloudifaryOld, res.redirect("/admin/film");
                            }
                        }
                    }
                }
            }
        }
    }
});

//Route pour suprimer un messaage de contact.
router.post('/film-del/:id', async function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");

    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");

    // Réponse pour récupérer le film dans la base de donnée
    var searchFilmId = await query_film.viewFilmId(req);

    console.log("searchFilmId", searchFilmId);
    
    if (!searchFilmId.status) return res.redirect('/admin/film');

    // Reponse Api pour supprimer l'image sur l'hébergement 
    var deleteUploadImgCloudifary = await upload_img.del_img_cloudinary(searchFilmId.data.public_id);

    console.log("deleteUploadImgCloudifary", deleteUploadImgCloudifary);

    if (deleteUploadImgCloudifary.status) {
        // Réponse de la base de donnée pour la suppresion du film
        var deleteFilmBDD = await query_film.delFilm(req);
        console.log("deleteFilmBDD", deleteFilmBDD);
        if (!deleteFilmBDD.status) {
            return res.redirect('/admin/film');
        } else {
            return res.redirect('/admin/film');
        }
    } else {
        return res.redirect('/admin/film');
    }
});

//Route pour redirection get route supression
router.get('/film-del/:id', async function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");

    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");

    // Réponse pour récupérer le film dans la base de donnée
    var searchFilmId = await query_film.viewFilmId(req);

    console.log("searchFilmId", searchFilmId);
    
    if (!searchFilmId.status) return res.redirect('/admin/film');

    // Reponse Api pour supprimer l'image sur l'hébergement 
    var deleteUploadImgCloudifary = await upload_img.del_img_cloudinary(searchFilmId.data.public_id);

    console.log("deleteUploadImgCloudifary", deleteUploadImgCloudifary);

    if (deleteUploadImgCloudifary.status) {
        // Réponse de la base de donnée pour la suppresion du film
        var deleteFilmBDD = await query_film.delFilm(req);
        console.log("deleteFilmBDD", deleteFilmBDD);
        if (!deleteFilmBDD.status) {
            return res.redirect('/admin/film');
        } else {
            return res.redirect('/admin/film');
        }
    } else {
        return res.redirect('/admin/film');
    }
});

// ------------------------------ FIN ROUTE ADMIN FILM -----------------------------

// ------------------------------ Début ROUTE ADMIN Contact ---------------------------

/* GET panel-contact page. */
router.get('/contact', async function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    // Réponse de a BDD
    var reponseContactView = await query_contact.viewContact(req);
    return res.render('./pages/panel-contact', { online: req.session.user, title: 'Film 2022 - Panel Contact', reponseContactView});
});

//Route pour suprimer un messaage de contact.
router.post('/contact-del/:id', async function(req, res, next) {
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    var delContact = await query_contact.delContact(req);
    return delContact, res.redirect("/admin/contact");
});

// ------------------------------ Fin ROUTE ADMIN Contact -----------------------------

// ------------------------------ Début ROUTE ADMIN FAQ -------------------------------

/* GET panel-faq page. */
router.get('/faq', async function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    // Response de la base de donnée
    var reponseFAQ = await query_faq.viewFAQ();
    return res.render('./pages/panel-faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', reponseFAQView : reponseFAQ});
  });
  
  /* GET panel-faq-add page. */
  router.get('/faq-add', function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    return res.render('./pages/panel-faq-add', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', faqADD: req.session.reponseFAQAdd});
});
  
//Route pour enregistrer une nouvelle FAQ.
router.post('/faq-add', async function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    // Vérification des informations de la requête 
    var validationFAQADD = await validation_faq.valdationFAQAdd(req);
  
    if (!validationFAQADD.status) {
        // Mise a jour de la session
        req.session.reponseFAQAdd = validationFAQADD;
        return res.redirect("/admin/faq-add");
    } else {
        // Mise a jour de la session
        req.session.reponseFAQAdd = validationFAQADD;
  
        //Reponse de la base de donné
        var reponseFAQADD = await query_faq.addFAQ(req);
        
        if (!reponseFAQADD) {
            // Mise a jour de la session
            req.session.reponseFAQAdd = reponseFAQADD;
            // Redirection route
            return res.redirect("/admin/faq-add");
        } else {
            // Mise a jour de la session
            req.session.reponseFAQAdd = {
                status : true,
                text : "",
                // saveData : {},
                data : {}
            };
  
            // Redirection route
            return res.redirect("/admin/faq");
        }
    }
});
  
//Route pour modifier une FAQ.
router.post('/faq-edit/:id', async function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    // Vérification des informations de la requête
    var validationFAQEdit = await validation_faq.valdationFAQEdit(req);
    if (!validationFAQEdit.status) {
        // Mise a jour de la session
        req.session.reponseFaqEdit.status = validationFAQEdit.status;
        req.session.reponseFaqEdit.text = validationFAQEdit.text;
        req.session.reponseFaqEdit.saveData = validationFAQEdit.data;
        return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', faqEdit: req.session.reponseFaqEdit});
    } else {
        // Response de la base de donnée
        var reponseFAQEdit = await query_faq.editFAQ(req); 
        if (!reponseFAQEdit.status) {
            // Mise a jour de la session
            req.session.reponseFaqEdit.status = validationFAQEdit.status;
            req.session.reponseFaqEdit.text = validationFAQEdit.text;
            req.session.reponseFaqEdit.saveData = validationFAQEdit.data;
            return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', faqEdit: req.session.reponseFaqEdit});
        } else {
            return res.redirect('/admin/faq');
        }
    }
});
  
/* GET panel-faq-edit page. */
router.get('/faq-edit/:id', async function(req, res, next) {
  
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
  
    console.log("req.session.reponseFaqEdit", req.session.reponseFaqEdit);
  
    // Réponse de la base donné
    var reponseFaqEdit = await query_faq.viewFAQID(req);
  
    if (!reponseFaqEdit.status) {
        req.session.reponseFaqEdit.status = reponseFaqEdit.status;
        req.session.reponseFaqEdit.text = reponseFaqEdit.text;
        req.session.reponseFaqEdit.saveData = reponseFaqEdit.data;
        return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier', faqEdit: req.session.reponseFaqEdit});
    } else {
  
        // On met la data dans un objet 
        req.session.reponseFaqEdit.data = reponseFaqEdit.data;
  
        // Condition de check pour savoir c'est le bon edit de l'id qu'on fait 
        if (req.session.reponseFaqEdit.data._id == req.session.reponseFaqEdit.saveData._id) {
            return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier', faqEdit: req.session.reponseFaqEdit});
        } else {
            // On met par défault les param edit
            req.session.reponseFaqEdit.status = true;
            req.session.reponseFaqEdit.text = "";
            req.session.reponseFaqEdit.saveData = {};
            return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier', faqEdit: req.session.reponseFaqEdit});
        }
    }  
});
  
// Route redirection si l'utilisateur est en cours d'une modification de faq
router.get('/faq-edit/', function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
  
    // Redirection  à la modification en cours ou sinon au panel faq
    // Object.key vérifier si l'objet est vide ou pas
    if (Object.keys(req.session.reponseFaqEdit.data).length === 0) {
        res.redirect("/panel-faq");
    } else {
        // On met par défault les param edit
        req.session.reponseFaqEdit.status = false;
        req.session.reponseFaqEdit.text = "";
        req.session.reponseFaqEdit.saveData = {};
        res.redirect(`/faq/edit/${req.session.reponseFaqEdit.data._id}`);
    }
});

/* GET /faq/del/id page. */
router.get('/faq-del/:id', async function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    var delFAQ = await query_faq.delFAQ(req);
    if (!delFAQ.status) {
        res.redirect('/admin/faq');
    } else {
        res.redirect('/admin/faq');
    }
});

//Route pour suprimer une faq.
router.post('/faq-del/:id', async function(req, res, next) {
    //Vérification si l'admin est connecter
    if (!req.session.user) return res.redirect("/");
    //Vérification si l'user à la permission
    if (!req.session.user.role == 1) return res.redirect("/");
    var delFAQ = await query_faq.delFAQ(req);
    if (!delFAQ.status) {
        res.redirect('/admin/faq');
    } else {
        res.redirect('/admin/faq');
    }
});

// ------------------------------ FIN ROUTE ADMIN FAQ -------------------------------

module.exports = router;