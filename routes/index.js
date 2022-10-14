var express = require('express');
var router = express.Router();

//Shéma bdd de l'user
const User = require('../models/users.js');

// Shéma FAQ 
const FAQ = require('../models/faq.js');

//Import des modules pour le password
var uid2 = require("uid2");
var CryptoJS = require("crypto-js");

//Module session
var session = require('express-session');

// Param Reponse User login par défault 
var reponseUserLogin = { 
    status : true,
    text : ""
};

/* GET Acceuil page. */
router.get('/', function(req, res, next) {
//   console.log("LOG DE SESSION DANS LA HOME ===>", req.session.user);
  // res.render('index', { title: 'Film 2022 - Acceuil' });
  res.render('./pages/index', { online: req.session.user, title: 'Film 2022 - Acceuil'});
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - contact' });
});

/* GET faq page. */
router.get('/faq', function(req, res, next) {
  FAQ.find().then(faq => { 
    // console.log("FAQ", faq);
    res.render('./pages/faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', faqResponse : faq});
  }).catch(err => {
    console.log("FAQ", err);
    res.render('./pages/faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', faqResponse : err});
});
});

/* GET login */
router.get('/login', function(req, res, next) {
    reponseUserLogin.status = true;
    reponseUserLogin.text = "";
    res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Panel Admin', reponseUserLogin});
});

/* GET panel-contact page. */
router.get('/panel-contact', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    res.render('./pages/panel-contact', { online: req.session.user, title: 'Film 2022 - Panel Contact' });
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
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    res.render('./pages/panel-film-add ', { online: req.session.user, title: 'Film 2022 - Panel Film - Ajouter' });
});

/* GET panel-film-edit page. */
router.get('/panel-film-edit', function(req, res, next) {
    //Vérification si l'admin eest connecter
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    res.render('./pages/panel-film-edit ', { online: req.session.user, title: 'Film 2022 - Panel Film - Modifier' });
});

/* GET panel-faq page. */
router.get('/panel-faq', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    FAQ.find().then(faq => { 
        // console.log("FAQ", faq);
        res.render('./pages/panel-faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', faqResponse : faq});
      }).catch(err => {
        console.log("FAQ", err);
        res.render('./pages/panel-faq', { online: req.session.user, title: 'Film 2022 - Panel FAQ', faqResponse : err});
    });
});

/* GET panel-faq-add page. */
router.get('/panel-faq-add', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    res.render('./pages/panel-faq-add ', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter' });
});

/* GET panel-faq-edit page. */
router.get('/panel-faq-edit', function(req, res, next) {
    //Vérification si l'admin eest connecter
    if (!req.session.user) {
        res.redirect("/");
    }
    res.render('./pages/panel-faq-edit ', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier' });
});

//Route pour enregistrer une nouvelle FAQ.
router.post('/faq/add', function(req, res, next) {

    //Stockage des données reçus du front
    var faqDataAdd  = {
        quest: req.body.quest,
        response: req.body.response,
    };

    //Création du document FAQ
    FAQ.create(faqDataAdd)
        .then(faq => {
            res.json({
                "text" : "Création réussie de FAQ !",
                "data" : faq
            });
        })
        //Si il y a une erreur
        .catch(err => {
            res.status(500).json({
                "text" : "Erreur Interne !",
                "code" : 500
            });
    });
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
                        console.log("/user/signup ERR (Interne)", err)
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
        //En cas d'erreur on sort leport 500
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

module.exports = router;
