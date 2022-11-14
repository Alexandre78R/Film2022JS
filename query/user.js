//Shéma User
const User = require('../models/users.js');

//Import des modules pour le password
var uid2 = require("uid2");
var CryptoJS = require("crypto-js");

// Variable de reponse des functions
var reponseUser =  {};

// Function d'inscription
async function signup (req) {

    // Création du sel
    var salt = uid2(32);

    //Stockage des données reçus du front
    var userData  = {
        username: req.body.username, // Username
        salt: salt,//Pour le déchiffrage mdp
        email: req.body.email, // email
        password : CryptoJS.AES.encrypt(req.body.password, salt).toString(),//MDP crypté
        role : 0,
        ban : false,
    };

    // Function pour cherchez l'email dans la base de donnée
    var searchEmail = await search_email(req.body.email);

    // Function pour cherchez l'username dans la base de donnée
    var searchUser = await search_username(req.body.username);

    if (searchEmail) {
        reponseUser.status = false;
        reponseUser.text = "L'email " + searchEmail.email + " existe déjà !";
        return reponseUser;
    } else if (searchUser) {
        reponseUser.status = false;
        reponseUser.text = "L'utilisateur " + searchUser.username + " existe déjà !";
        return reponseUser;
    } else {
        var createUser = await create_user(userData);
        if (!createUser) {
            reponseUser.status = false;
            reponseUser.text = "Erreur interne, impossible de créer le compte !";
            return reponseUser;
        } else {
            reponseUser.status = true;
            reponseUser.text = "Bienvenue " + createUser.username + " !";
            // reponseUser.token = user.getToken();
            reponseUser.user = createUser; 
            return reponseUser;
        }
    }
}

// Function de connexion 
async function login (req) {

    // On cherche l'username dans la base de donnée
    var searchUser = await search_username(req.body.username);

    //Si on ne touve pas l'username
    if (!searchUser) {
        reponseUser.status = false;
        reponseUser.text = "L'utilisateur " + req.body.username +  " n'existe pas !";
        console.log("reponseUser", reponseUser);
        return reponseUser;
        //Si l'username est trouvé + le passwoard est correct
    } else {
        // Si la personne est ban connexion refusé
        var checkBanUser = await check_ban_user(searchUser);
        if (checkBanUser.ban) return reponseUser = checkBanUser;

        var bytes = CryptoJS.AES.decrypt(searchUser.password, searchUser.salt);
        var hash = bytes.toString(CryptoJS.enc.Utf8);
        if (hash === req.body.password) {
            reponseUser.status = true;
            reponseUser.text = "";
            reponseUser.user = searchUser;
            return reponseUser;
            //Si l'username est trouvé mais le password
        } else {
            reponseUser.status = false;
            reponseUser.text = "Mot de passe incorrect !";
            return reponseUser;
        }
    }
}

// Function check si l'user est ban ou pas
async function check_ban_user (user) {

    var reponseCheckBanUser =  {};

    if (user.ban) {
        reponseCheckBanUser.status = false;
        reponseCheckBanUser.text = "Vous êtes banni.";
        reponseCheckBanUser.ban = true;
    } else {
        reponseCheckBanUser.status = true;
        reponseCheckBanUser.text = "Vous n'êtes pas banni.";
        reponseCheckBanUser.ban = false;
    }

    return reponseCheckBanUser;
}

// function gestion edit user 
async function editUser (id, userData) {

    var editUser = await edit_user(id, userData);

    if (!editUser) {
        reponseUser.status = false;
        reponseUser.text = "Erreur interne : Impossible de modifier l'user !";
        reponseUser.data = editUser;
        console.log("edit User --> reponseUser", reponseUser);
        return reponseUser;
    } else {
        reponseUser.status = true;
        reponseUser.text = "";
        reponseUser.data = editUser;
        console.log("edit User --> reponseUser", reponseUser);
        return reponseUser;
    }

}

// Fuction search username dans les users
async function search_username (username) {

    var reponseSearchUsername = false;

    // Requête vers la bdd
    await User.findOne({
        username: username
    }).then(user => {
        reponseSearchUsername = user;
    }).catch(err => {
        reponseSearchUsername = false;
    });
    
    return reponseSearchUsername;
}

// Fuction search email dans les users
async function search_email (email) {

    var reponseSearchEmail = false;

    // Requête vers la bdd
    await User.findOne({
        email: email
    }).then(user => {
        reponseSearchEmail = user;
    }).catch(err => {
        reponseSearchEmail = false;
    });

    return reponseSearchEmail;

}

// Function create user
async function create_user (userData) {

    var reponseCreateUser = false;

    // Requête vers la bdd
    await User.create(userData)
    .then(user => {
        reponseCreateUser = user;
    }).catch(err => {
        reponseCreateUser = false;
    });

    return reponseCreateUser;
}

// function edit user 
async function edit_user (id, userData) {

    var reponseEditUser = false;

    // Requête à la base de donnée
    await User.update({ _id : id}, userData)
    .then(user => {
        reponseEditUser = user;
    })
    //Si il y a une erreur
    .catch(err => {
        reponseEditUser = false;
    });

    return reponseEditUser;
}

module.exports = {
    signup : signup,
    login : login,
    editUser : editUser,
};