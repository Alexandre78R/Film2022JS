var express = require('express');
var router = express.Router();

//Shéma bdd de l'user
const User = require('../models/users.js');

//Import des modules pour le password
var uid2 = require("uid2");
var CryptoJS = require("crypto-js");

//Module session
var session = require('express-session');

/* GET Acceuil page. */
router.get('/', function(req, res, next) {
  console.log("LOG DE SESSION DANS LA HOME ===>", req.session.user);
  // res.render('index', { title: 'Film 2022 - Acceuil' });
  res.render('./pages/index', { online: req.session.user, title: 'Film 2022 - Acceuil'});
});

/* GET contact page. */
router.get('/contact', function(req, res, next) {
  res.render('./pages/contact', { online: req.session.user, title: 'Film 2022 - contact' });
});

/* GET faq page. */
router.get('/faq', function(req, res, next) {
  res.render('./pages/faq', { online: req.session.user, title: 'Film 2022 - FAQ' });
});

/* GET faq page. */
router.get('/login', function(req, res, next) {
  res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Login : Panel Admin' });
});

//Route pour enregistrer un nouveau compte.
router.post('/user/signup', function(req, res, next) {

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
    }

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

  console.log(req.session)
  //On regarde dans la BDD si l'username existe bien.
  User.findOne({
      username: req.body.username
  }).then(async user => {
          //Si on ne touve pas l'username on r'envois erreur 401
      if (!user) {
          res.json({
              "text": "L'utilisateur " + req.body.username +  " n'existe pas !",
              "code": 401
          })
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
              res.json({
                  "text": "Mot de passe incorrect !",
                  "code": 402
              })
          }
      }
  //En cas d'erreur on sort leport 500
  }).catch(err => {
      console.log("/user/login ERR (Login (Interne))", err)
      res.status(500).json({
          "text" : "Erreur Interne !",
          "code" : 500
      });
  })
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
