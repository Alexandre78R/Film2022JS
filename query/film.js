var FILM = require("../models/film.js");

var reponse = {};

// Function pour gerer la view des film
async function viewFilm () {
    
    var searchListFilm = await search_list_film ();
    console.log("searchListFilm", searchListFilm);
    if (searchListFilm.length == 0) {
        reponse.status =  false;
        reponse.text = "Aucun film se trouve dans la base de données !";
        reponse.data = searchListFilm;
        return reponse;
    } else {
        reponse.status =  true;
        reponse.text = "Listes de film trouver !";
        reponse.data = searchListFilm;
        return reponse;
    }
}

//Function pour gerer la view d'un film avec son id
async function viewFilmId (req) {

    var idFilm = req.params.id;

    var searchIdFilm = await search_id_film(idFilm);

    if (!searchIdFilm) {
        reponse.status = false;
        reponse.text = "Impossible de trouver le film !";
        reponse.data = searchIdFilm;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "Film trouver !";
        reponse.data = searchIdFilm;
        return reponse;
    }
}

//Function pour gerer la view d'un film avec son nom
async function viewFilmName (name) {

    var searchIdFilm = await search_name_film(name);

    if (!searchIdFilm) {
        reponse.status = true;
        reponse.text = "Impossible de trouver le film !";
        reponse.data = searchIdFilm;
        return reponse;
    } else {
        reponse.status = false;
        reponse.text = "Merci d'insérer un autre nom de film unique !";
        reponse.data = searchIdFilm;
        return reponse;
    }
}

// Function pour gérer la suprresion d'un film
async function delFilm (req) {

    var delIdFilm = req.params.id;

    var delFilm = await del_film(delIdFilm);

    if (!delFilm) {
        reponse.status = false;
        reponse.text = "Erreur interne : Impossible de suprimer le film !";
        reponse.data = delFilm;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "Film supprimer !";
        reponse.data = delFilm;
        return reponse;
    }
}

// Function pour la gestion d'ajout d'un film
async function addFilm (FilmSave) {

    var createFilm = await create_film(FilmSave);

    if(!createFilm) {
        reponse.status = false;
        reponse.text = "Erreur interne : Impossible de créer le nouveau film !";
        reponse.data = createFilm;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "Film ajouté !";
        reponse.data = createFilm;
        return reponse;
    }
}

// Function pour la gestion d'edit d'un film
async function editFilm (req, FilmEdit) {

    var editIdFilm = req.params.id;

    var editFilm = await edit_film(editIdFilm, FilmEdit);

    if(!editFilm) {
        reponse.status = false;
        reponse.text = "Erreur interne : Impossible de modifer film !";
        reponse.data = editFilm;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "Film modifier !";
        reponse.data = editFilm;
        return reponse;
    }
}

// Function récuperer tous les films de la base donnée
async function search_list_film () {

    var reponseSearchListFilm = false;

    // Reqûete vers la BDDs
    await FILM.find().then(film => {
        reponseSearchListFilm = film;
    }).catch(err => {
        reponseSearchListFilm =  false;
    });

    return reponseSearchListFilm;
}

// Function pour chercher le film avec l'id dans la base de donné
async function search_id_film (id) {
    
    var reponseSearchIdFilm =  false;

    //Reqûete vers la base de donnée
    await FILM.findById({
        _id : id,
    }).then(film => {
        reponseSearchIdFilm = film;
    }).catch(err =>{
        reponseSearchIdFilm = false;
    });

    return reponseSearchIdFilm;
}

// Function pour chercher le film avec le nom dans la base de donné
async function search_name_film (name) {
    
    var reponseSearchNameFilm =  false;
    
    //Reqûete vers la base de donnée
    await FILM.findOne({
        name : name,
    }).then(film => {
        reponseSearchNameFilm = film;
    }).catch(err =>{
        reponseSearchNameFilm = false;
    });

    console.log("reponseSearchNameFilm", reponseSearchNameFilm);

    return reponseSearchNameFilm;
}

// Function pour suprimmer le film dans la base de donnée
async function del_film (id) {

    var reponseDelFilm = false;

    // Requête vers la base de donnée
    await FILM.findByIdAndRemove(id)
    .then(film => {
        reponseDelFilm = film;
    })
    .catch(err => {
        reponseDelFilm = false;
    });

    return reponseDelFilm;
}

// Function pour ajouter un film dans la bdd
async function create_film (filmDataAdd) {
    
    var reponseCreateFilm = false;
    
    // Requête vers là base de donné 
    await FILM.create(filmDataAdd)
    .then(film => {
        console.log("Film", film);
        reponseCreateFilm = film;
    }).catch(err => {
        console.log("Erreur create film", err);
        reponseCreateFilm = false;
    });

    return reponseCreateFilm;
}

// Function pour modifer un film dans la base de donné
async function edit_film (id, FilmEdit) {
    
    var reponseEditFilm = false;

    // Requête vers là bdd
    await FILM.update({ _id : id}, FilmEdit)
    .then(film => {
        reponseEditFilm = film;
    }).catch(err => {
        reponseEditFilm = false;
    });

    return reponseEditFilm;
}

module.exports = {
    viewFilm : viewFilm,
    delFilm : delFilm,
    viewFilmId : viewFilmId,
    viewFilmName : viewFilmName,
    addFilm : addFilm,
    editFilm : editFilm,
};