var reponse = {};

// Function validation Singup req
async function validationSignup (req) {
    if (req.body.username === "" || req.body.username == undefined){
        reponse.status = false;
        reponse.text = "Merci d'indiquer un identifiant !";
        return reponse;
    } else if (req.body.email === "" || req.body.email == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'indiquer un email !";
        return reponse;
    } else if (req.body.password === "" || req.body.password == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'indiquer un mot de passe !";
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        return reponse;
    }
}

// Function validation login req
async function validationLogin (req) {
    if (req.body.username === ""  || req.body.username == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre identifiant !";
        return reponse;
    } else if (req.body.password === "" || req.body.password == undefined){
        reponse.status = false;
        reponse.text = "Merci d'insérer votre mot de passe !";
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        return reponse;
    }
}

// Export des function de validation user 
module.exports = {
    validationSignup : validationSignup,
    validationLogin : validationLogin
};