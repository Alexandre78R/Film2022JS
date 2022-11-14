var regex = require("../regex.js");
var reponse = {};

// Function validation requête add film
async function validationFilmADD (FilmSave) {
    if (FilmSave.name === ""){
        reponse.status = false;
        reponse.text = "Merci d'insérer un nom de film";
        reponse.data = FilmSave;
        return reponse;
    } else if (FilmSave.img == null) {
        reponse.status = false;
        reponse.text = "Merci d'insérer une image";
        reponse.data = FilmSave;
        return reponse;
    } else if (FilmSave.url_alloCine === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url pour allocine";
        reponse.data = FilmSave;
        return reponse;
    } else if (!FilmSave.url_alloCine == undefined && regex.url_verif(FilmSave.url_alloCine) == false) {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url correct pour allocine";
        reponse.data = FilmSave;
        return reponse;
    } else if (FilmSave.note_alloCine === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une note pour allocine";
        reponse.data = FilmSave;
        return reponse;
    } else if (FilmSave.url_senscritique === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url pour senscritique";
        reponse.data = FilmSave;
        return reponse;
    } else if (!FilmSave.url_senscritique == undefined && regex.url_verif(FilmSave.url_senscritique) == false) {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url correct pour senscritique";
        reponse.data = FilmSave;
        return reponse;
    } else if (FilmSave.note_senscritique === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une note pour senscritique";
        reponse.data = FilmSave;
        return reponse;
    } else if (FilmSave.url_cineserie === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url pour cineserie";
        reponse.data = FilmSave;
        return reponse;
    } else if (!FilmSave.url_cineserie == undefined && regex.url_verif(FilmSave.url_cineserie) == false) {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url correct pour cineserie";
        reponse.data = FilmSave;
        return reponse;
    } else if (FilmSave.note_cineserie === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une note pour cineserie";
        reponse.data = FilmSave;
        return reponse;
    } else if (FilmSave.url_source === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url pour la source";
        reponse.data = FilmSave;
        return reponse;
    } else if (regex.url_verif(FilmSave.url_source) == false) {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url correct pour la source";
        reponse.data = FilmSave;
        return reponse;
    } else if (FilmSave.descriptions === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une descriptions du film";
        reponse.data = FilmSave;
        return reponse;
    } else {     
        reponse.status = true;
        reponse.text = "";
        reponse.data = FilmSave; 
        return reponse;
    }
}

async function validationFilmEdit (FilmEdit) {
    
    if (FilmEdit.name === ""){
        reponse.status = false;
        reponse.text = "Merci d'insérer un nom de film";
        reponse.data = FilmEdit;
        return reponse;
    } else if (FilmEdit.url_alloCine === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url pour allocine";
        reponse.data = FilmEdit;
        return reponse;
    } else if (!FilmEdit.url_alloCine == undefined && regex.url_verif(FilmEdit.url_alloCine) == false) {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url correct pour allocine";
        reponse.data = FilmEdit;
        return reponse;
    } else if (FilmEdit.note_alloCine === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une note pour allocine";
        reponse.data = FilmEdit;
        return reponse;
    } else if (FilmEdit.url_senscritique === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url pour senscritique";
        reponse.data = FilmEdit;
        return reponse;
    } else if (!FilmEdit.url_senscritique == undefined && regex.url_verif(FilmEdit.url_senscritique) == false) {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url correct pour senscritique";
        reponse.data = FilmEdit;
        return reponse;
    } else if (FilmEdit.note_senscritique === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une note pour senscritique";
        reponse.data = FilmEdit;
        return reponse;
    } else if (FilmEdit.url_cineserie === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url pour cineserie";
        reponse.data = FilmEdit;
        return reponse;
    } else if (!FilmEdit.url_cineserie == undefined && regex.url_verif(FilmEdit.url_cineserie) == false) {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url correct pour cineserie";
        reponse.data = FilmEdit;
        return reponse;
    } else if (FilmEdit.note_cineserie === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une note pour cineserie";
        reponse.data = FilmEdit;
        return reponse;
    } else if (FilmEdit.url_source === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url pour la source";
        reponse.data = FilmEdit;
        return reponse;
    } else if (regex.url_verif(FilmEdit.url_source) == false) {
        reponse.status = false;
        reponse.text = "Merci d'insérer une url correct pour la source";
        reponse.data = FilmEdit;
        return reponse;
    } else if (FilmEdit.descriptions === "") {
        reponse.status = false;
        reponse.text = "Merci d'insérer une descriptions du film";
        reponse.data = FilmEdit;
        return reponse;
    } else {     
        reponse.status = true;
        reponse.text = "";
        reponse.data = FilmEdit; 
        return reponse;
    }
}

module.exports = {
    validationFilmADD : validationFilmADD,
    validationFilmEdit : validationFilmEdit,
};



// /* GET panel-faq-edit page. */
// router.get('/panel-faq-edit/:id', async function(req, res, next) {

//     //Vérification si l'admin est connecter
//     if (!req.session.user) return res.redirect("/");

//     // Réponse de la base donné
//     var reponseFaqEdit = await query_faq.viewFAQID(req);

//     if (!reponseFaqEdit.status) {
//         req.session.reponseFaqEdit.status = reponseFaqEdit.status;
//         req.session.reponseFaqEdit.text = reponseFaqEdit.text;
//         req.session.reponseFaqEdit.saveData = reponseFaqEdit.data;
//         return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier', faqEdit: req.session.reponseFaqEdit});
//     } else {

//         // On met la data dans un objet 
//         req.session.reponseFaqEdit.data = reponseFaqEdit.data;

//         // Condition de check pour savoir c'est le bon edit de l'id qu'on fait 
        // if (req.session.reponseFaqEdit.data._id == req.session.reponseFaqEdit.saveData._id) {
        //     return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier', faqEdit: req.session.reponseFaqEdit});
        // } else {
        //     // On met par défault les param edit
        //     req.session.reponseFaqEdit.status = true;
        //     req.session.reponseFaqEdit.text = "";
        //     req.session.reponseFaqEdit.saveData = {};
        //     return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Modifier', faqEdit: req.session.reponseFaqEdit});
        // }
//     }  
// });

// // Route redirection si l'utilisateur est en cours d'une modification de faq
// router.get('/panel-faq-edit', function(req, res, next) {
//     //Vérification si l'admin est connecter
//     if (!req.session.user) return res.redirect("/");

    // // Redirection  à la modification en cours ou sinon au panel faq
    // // Object.key vérifier si l'objet est vide ou pas
    // if (Object.keys(req.session.reponseFaqEdit.data).length === 0) {
    //     res.redirect("/panel-faq");
    // } else {
    //     // On met par défault les param edit
    //     req.session.reponseFaqEdit.status = false;
    //     req.session.reponseFaqEdit.text = "";
    //     req.session.reponseFaqEdit.saveData = {};
    //     res.redirect(`/panel-faq-edit/${req.session.reponseFaqEdit.data._id}`);
    // }
// });

// /* GET /faq/del/id page. */
// router.get('/faq/edit/:id', function(req, res, next) {
//     //Vérification si l'admin est connecter
//     if (!req.session.user) return res.redirect("/");
//     return res.redirect(`/panel-faq-edit/${req.session.reponseFaqEdit.data._id}`);
// });

// //Route pour modifier une FAQ.
// router.post('/faq/edit/:id', async function(req, res, next) {
//     //Vérification si l'admin est connecter
//     if (!req.session.user) return res.redirect("/");
//     // Vérification des informations de la requête
//     var validationFAQEdit = await validation_faq.valdationFAQEdit(req);
//     if (!validationFAQEdit.status) {
//         // Mise a jour de la session
//         req.session.reponseFaqEdit.status = validationFAQEdit.status;
//         req.session.reponseFaqEdit.text = validationFAQEdit.text;
//         req.session.reponseFaqEdit.saveData = validationFAQEdit.data;
//         return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', faqEdit: req.session.reponseFaqEdit});
//     } else {
//         // Response de la base de donnée
//         var reponseFAQEdit = await query_faq.editFAQ(req); 
//         if (!reponseFAQEdit.status) {
//             // Mise a jour de la session
//             req.session.reponseFaqEdit.status = validationFAQEdit.status;
//             req.session.reponseFaqEdit.text = validationFAQEdit.text;
//             req.session.reponseFaqEdit.saveData = validationFAQEdit.data;
//             return res.render('./pages/panel-faq-edit', { online: req.session.user, title: 'Film 2022 - Panel FAQ - Ajouter', faqEdit: req.session.reponseFaqEdit});
//         } else {
//             return res.redirect('/panel-faq');
//         }
//     }
// });
