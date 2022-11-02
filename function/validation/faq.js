var reponse = {};

async function valdationFAQAdd (req) {
    if (req.body.quest === "" || req.body.quest == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre question !";
        reponse.data = req.body;
        return reponse;
    } else if (req.body.response === "" || req.body.response == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre réponse !";
        reponse.data = req.body;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        reponse.data = req.body;
        return reponse;
    }
}

async function valdationFAQEdit (req) {
    if (req.body.quest === "" || req.body.quest == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre question !";
        reponse.data = req.body;
        return reponse;
    } else if (req.body.response === "" || req.body.response == undefined) {
        reponse.status = false;
        reponse.text = "Merci d'insérer votre réponse !";
        reponse.data = req.body;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "";
        reponse.data = req.body;
        return reponse;
    }
}

module.exports = {
    valdationFAQAdd : valdationFAQAdd,
    valdationFAQEdit : valdationFAQEdit,
};