var express = require('express');
var router = express.Router();

// Validation User
const validation_user = require("../function/validation/user.js");

//Query User 
const query_user = require("../query/user.js");

// Param view login default  
var reponseUserLogin = {
    status : true,
    text : "",
};

//Route redirection route signup
router.get('/signup', function(req, res, next) {
    res.json({
        "text" : "Accès Refusé ! Merci d'utilisé une requête POST !",
        "status" : false
    });
});

//Route pour enregistrer un nouveau compte.
router.post('/signup', async function(req, res, next) {
    // Vérification des informations de la requête 
    var validationSignup = await validation_user.validationSignup(req);
    if (!validationSignup.status) {
        res.json({
            "text" : validationSignup.text,
            "status" : validationSignup.status
        });
    } else {
        // Response de la base de donnée
        var reponseSignup = await query_user.signup(req);
        console.log("reponseSignup", reponseSignup);
        if (!reponseSignup.status)  {
            res.json({
                "rep" : reponseSignup.text,
                "status" : reponseSignup.status
            });
        } else {
            res.json({
                "rep" : reponseSignup.text,
                "user" : reponseSignup.user,
                "status" : reponseSignup.status
            });
        }
    }
});

//Route redirection route login
router.get('/login', function(req, res, next) {
    res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Connexion', reponseUserLogin});
});

//Route pour la connexion.
router.post('/login', async function(req, res, next) {
    // Vérification des informations de la requête 
    var validationLogin = await validation_user.validationLogin(req);
    if (!validationLogin.status) {
        res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Connexion', reponseUserLogin : validationLogin});
    } else {
        // Request a la base donnée
        var reponseLogin = await query_user.login(req);
        // Response de la base de donnée
        if (!reponseLogin.status) {
            return res.render('./pages/login', { online: req.session.user, title: 'Film 2022 - Panel Admin', reponseUserLogin : reponseLogin});
        } else {
            // var userDataEdit = {
            //     username : reponseLogin.user.username,
            //     salt : reponseLogin.user.salt,
            //     email : reponseLogin.user.email,
            //     password : reponseLogin.user.password,
            //     role : 0,
            //     ban : false,
            // };
            // var editLogin = await query_user.editUser(reponseLogin.user._id, userDataEdit);
            
            // On Sauvegarde les informations de connexion en session et on met l'etat true 
            req.session.user = reponseLogin.user;
            req.session.user.online = true;
            // return editLogin, res.redirect('/');
            // Redirection à la racine du site
            return res.redirect('/');
        }
    }
});

// GET Syntax Logout
router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/');
            }
        });
    }
});

module.exports = router;
