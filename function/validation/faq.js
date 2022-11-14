var reponse = {};

async function valdationFAQAdd (req) {
    var dataValidationFAQEDIT = { quest : req.body.quest, response : req.body.response};
    if (req.body.quest === "" || req.body.quest == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre question !";
        reponse.data = dataValidationFAQEDIT;
        return reponse;
    } else if (req.body.response === "" || req.body.response == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre réponse !";
        reponse.data = dataValidationFAQEDIT;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        reponse.data = dataValidationFAQEDIT;
        return reponse;
    }
}

async function valdationFAQEdit (req) {
    var dataValidationFAQEDIT = { quest : req.body.quest, response : req.body.response};
    if (req.body.quest === "" || req.body.quest == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre question !";
        reponse.data = dataValidationFAQEDIT;
        return reponse;
    } else if (req.body.response === "" || req.body.response == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre réponse !";
        reponse.data = dataValidationFAQEDIT;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        reponse.data = dataValidationFAQEDIT;
        return reponse;
    }
}

module.exports = {
    valdationFAQAdd : valdationFAQAdd,
    valdationFAQEdit : valdationFAQEdit,
};