// Sélections des buttom Allocine
const selectElement_allocine = document.querySelector('#checkbox_allocine');

// Sélections des buttom Allocine
const selectElement_allocine_hidden = document.querySelector('#checkbox_allocine_hidden');

// Sélections des buttom Sens Critique
const selectElement_senscritique = document.querySelector('#checkbox_sensCritique');

// Sélections des buttom Sens Critique
const selectElement_senscritique_hidden = document.querySelector('#checkbox_senscritique_hidden');

// Sélections des buttom Ciné Séries
const selectElement_cineserie = document.querySelector('#checkbox_cineSeries');

// Sélections des buttom Ciné Séries
const selectElement_cineserie_hidden = document.querySelector('#checkbox_cineSeries_hidden');

//Création de block allocine
var align_allocine = document.createElement("br");
var newText_allocine = document.createElement("label");
var newInput_allocine = document.createElement("input");
var newInput_allocine_number = document.createElement("input");

// Param du label allocine
newText_allocine.textContent = "AlloCiné Url - Note";
// Param de l'imput allocine text
newInput_allocine.size = 25;
newInput_allocine.placeholder = "https://exemple.com";
newInput_allocine.name = "url_alloCine";

// Param de l'imput allocine number
newInput_allocine_number.type = "number";
newInput_allocine_number.name = "note_alloCine";
newInput_allocine_number.size = 5;
newInput_allocine_number.step = "0.1";
newInput_allocine_number.min = "0";
newInput_allocine_number.max = "10";

//Création de block Senscritique
var align_senscritique = document.createElement("br");
var newText_senscritique = document.createElement("label");
var newInput_senscritique = document.createElement("input");
var newInput_senscritique_number = document.createElement("input");

// Param du label Senscritique
newText_senscritique.textContent = "Senscritique Url - Note";
// Param de l'imput Senscritique
newInput_senscritique.size = 25;
newInput_senscritique.placeholder = "https://exemple.com";
newInput_senscritique.name = "url_senscritique";

// Param de l'imput allocine number
newInput_senscritique_number.type = "number";
newInput_senscritique_number.name = "note_senscritique";
newInput_senscritique_number.size = 5;
newInput_senscritique_number.step = "0.1";
newInput_senscritique_number.min = "0";
newInput_senscritique_number.max = "10";

//Création de block CinéSérie
var align_cineserie = document.createElement("br");
var newText_cineserie = document.createElement("label");
var newInput_cineserie = document.createElement("input");
var newInput_cineserie_number = document.createElement("input");

// Param du label CinéSérie
newText_cineserie.textContent = "CinéSérie  Url - Note";
// Param de l'imput CinéSérie
newInput_cineserie.size = 25;
newInput_cineserie.placeholder = "https://exemple.com";
newInput_cineserie.name = "url_cineserie";

// Param de l'imput allocine number
newInput_cineserie_number.type = "number";
newInput_cineserie_number.name = "note_cineserie";
newInput_cineserie_number.size = 5;
newInput_cineserie_number.step = "0.1";
newInput_cineserie_number.min = "0";
newInput_cineserie_number.max = "10";

// Création sur container Allociné
var containerAllocine = document.getElementById('url_active_allocine');

// Création sur container SensCritique
var containerSenscritique = document.getElementById('url_active_sensCritique');

// Création sur container CinéSéries
var containerCineserie = document.getElementById('url_active_cineSeries');

// Count buttom Allocine
var countAllocine = 0;

// Si le button est checked par default on fait apparaitre les container
if (selectElement_allocine.checked == true) {
    containerAllocine.appendChild(newText_allocine);
    containerAllocine.appendChild(align_allocine);
    containerAllocine.appendChild(newInput_allocine);
    containerAllocine.appendChild(newInput_allocine_number);
    // containerAllocine.appendChild(align_allocine);
    countAllocine++;
    
    // console.log("selectElement_allocine.value", selectElement_allocine.value);
    // console.log("selectElement_allocine_hidden", selectElement_allocine_hidden);

    // console.log("selectElement_allocine.value.url_alloCine", selectElement_allocine.value.url_alloCine);
    // console.log("selectElement_allocine.value.note_alloCine", selectElement_allocine.value.note_alloCine);
    if (selectElement_allocine.value === "on") {
        newInput_allocine.value = "";
        newInput_allocine_number.value = "";
    } else {
        newInput_allocine.value = selectElement_allocine.value;
        newInput_allocine_number.value = selectElement_allocine_hidden.value;
    }
    // selectElement_allocine.value = countAllocine;
    // console.log("selectElement_allocine", selectElement_allocine);
}

// Event quand on sélectionne le buttom allocine
selectElement_allocine.addEventListener('change', (event) => {
    if (countAllocine == 0) {
        containerAllocine.appendChild(newText_allocine);
        containerAllocine.appendChild(align_allocine);
        containerAllocine.appendChild(newInput_allocine);
        containerAllocine.appendChild(newInput_allocine_number);
        // containerAllocine.appendChild(align_allocine);
        countAllocine++;
        // selectElement_allocine.value = countAllocine;
        // console.log("selectElement_allocine", selectElement_allocine);
        if (selectElement_allocine.value === "on") {
            newInput_allocine.value = "";
            newInput_allocine_number.value = "";
        } else {
            newInput_allocine.value = selectElement_allocine.value;
            newInput_allocine_number.value = selectElement_allocine_hidden.value;
        }
    } else {
        containerAllocine.removeChild(newText_allocine);
        containerAllocine.removeChild(align_allocine);
        containerAllocine.removeChild(newInput_allocine);
        containerAllocine.removeChild(newInput_allocine_number);
        newInput_allocine.value = "";
        // containerAllocine.removeChild(align_allocine);
        countAllocine--;
        // selectElement_allocine.value = countAllocine;
        // console.log("selectElement_allocine", selectElement_allocine);
        if (selectElement_allocine.value === "on") {
            newInput_allocine.value = "";
            newInput_allocine_number.value = "";
        } else {
            newInput_allocine.value = selectElement_allocine.value;
            newInput_allocine_number.value = selectElement_allocine_hidden.value;
        }
    }
});

// Count buttom Senscritique
var countSenscritique = 0;

// Si le button est checked par default on fait apparaitre les container
if (selectElement_senscritique.checked == true) {
    containerSenscritique.appendChild(newText_senscritique);
    containerSenscritique.appendChild(align_senscritique);
    containerSenscritique.appendChild(newInput_senscritique);
    containerSenscritique.appendChild(newInput_senscritique_number);
    // containerSenscritique.appendChild(align_senscritique);
    countSenscritique++;
    // selectElement_senscritique.value = countSenscritique;
    // console.log("selectElement_senscritique", selectElement_senscritique);
    if (selectElement_senscritique.value === "on") {
        newInput_senscritique.value = "";
        newInput_senscritique_number.value = "";
    } else {
        newInput_senscritique.value = selectElement_senscritique.value;
        newInput_senscritique_number.value = selectElement_senscritique_hidden.value;
    }
}


// Event quand on sélectionne le buttom allocine
selectElement_senscritique.addEventListener('change', (event) => {
    if (countSenscritique == 0) {
        containerSenscritique.appendChild(newText_senscritique);
        containerSenscritique.appendChild(align_senscritique);
        containerSenscritique.appendChild(newInput_senscritique);
        containerSenscritique.appendChild(newInput_senscritique_number);
        // containerSenscritique.appendChild(align_senscritique);
        countSenscritique++;
        // selectElement_senscritique.value = countSenscritique;
        // console.log("selectElement_senscritique", selectElement_senscritique);
        if (selectElement_senscritique.value === "on") {
            newInput_senscritique.value = "";
            newInput_senscritique_number.value = "";
        } else {
            newInput_senscritique.value = selectElement_senscritique.value;
            newInput_senscritique_number.value = selectElement_senscritique_hidden.value;
        }
    } else {
        containerSenscritique.removeChild(newText_senscritique);
        containerSenscritique.removeChild(align_senscritique);
        containerSenscritique.removeChild(newInput_senscritique);
        containerSenscritique.removeChild(newInput_senscritique_number);
        newInput_senscritique.value = "";
        // containerSenscritique.removeChild(align_senscritique);
        countSenscritique--;
        // selectElement_senscritique.value = countSenscritique;
        // console.log("selectElement_senscritique", selectElement_senscritique);
        if (selectElement_senscritique.value === "on") {
            newInput_senscritique.value = "";
            newInput_senscritique_number.value = "";
        } else {
            newInput_senscritique.value = selectElement_senscritique.value;
            newInput_senscritique_number.value = selectElement_senscritique_hidden.value;
        }
    }
});

// Count buttom Allocine
var countCineserie = 0;

// Si le button est checked par default on fait apparaitre les container
if (selectElement_cineserie.checked == true) {
    containerCineserie.appendChild(newText_cineserie);
    containerCineserie.appendChild(align_cineserie);
    containerCineserie.appendChild(newInput_cineserie);
    containerCineserie.appendChild(newInput_cineserie_number);
    // container.appendChild(align_cineserie);
    countCineserie++;
    // selectElement_cineserie.value = countCineserie;
    // console.log("selectElement_cineserie", selectElement_cineserie);
    if (selectElement_cineserie.value === "on") {
        newInput_cineserie.value = "";
        newInput_cineserie_number.value = "";
    } else {
        newInput_cineserie.value = selectElement_cineserie.value;
        newInput_cineserie_number.value = selectElement_cineserie_hidden.value;
    }
}

// Event quand on sélectionne le buttom allocine
selectElement_cineserie.addEventListener('change', (event) => {
    if (countCineserie == 0) {
        containerCineserie.appendChild(newText_cineserie);
        containerCineserie.appendChild(align_cineserie);
        containerCineserie.appendChild(newInput_cineserie);
        containerCineserie.appendChild(newInput_cineserie_number);
        // container.appendChild(align_cineserie);
        countCineserie++;
        // selectElement_cineserie.value = countCineserie;
        // console.log("selectElement_cineserie", selectElement_cineserie);
        if (selectElement_cineserie.value === "on") {
            newInput_cineserie.value = "";
            newInput_cineserie_number.value = "";
        } else {
            newInput_cineserie.value = selectElement_cineserie.value;
            newInput_cineserie_number.value = selectElement_cineserie_hidden.value;
        }
    } else {
        containerCineserie.removeChild(newText_cineserie);
        containerCineserie.removeChild(align_cineserie);
        containerCineserie.removeChild(newInput_cineserie);
        containerCineserie.removeChild(newInput_cineserie_number);
        newInput_cineserie.value = "";
        // container.removeChild(align_cineserie);
        countCineserie--;
        // selectElement_cineserie.value = countCineserie;
        // console.log("selectElement_cineserie", selectElement_cineserie);
        if (selectElement_cineserie.value === "on") {
            newInput_cineserie.value = "";
            newInput_cineserie_number.value = "";
        } else {
            newInput_cineserie.value = selectElement_cineserie.value;
            newInput_cineserie_number.value = selectElement_cineserie_hidden.value;
        }
    }
});

// Sauvegarde code seul 
// Sélections des buttom radio
// const selectElement_alloCine_y = document.querySelector('#radio_url_alloCine_y');
// const selectElement_alloCine_n = document.querySelector('#radio_url_alloCine_n');

// //Création de block html pur sauter une ligne
// var align = document.createElement("br");

// // Création de
// var newTextAllocine = document.createElement("label");
// var newInputAllocine = document.createElement("input");

// // Param du label qu'on a créer juste avant 
// newTextAllocine.textContent = "Url AlloCiné";
// // Param de l'imput qu'on a créer juste avant 
// newInputAllocine.size = 30;
// newInputAllocine.placeholder = "https://exemple.com";
// newInputAllocine.name = "url_alloCine";

// // Création sur container pour le placement de nos création label et input
// var container = document.getElementById('url_alloCine_active');
// container.className = "structure-contact";

// // Event quand on sélectionne le buttom y de allocine
// selectElement_alloCine_y.addEventListener('change', (event) => {
//     container.appendChild(newTextAllocine);
//     container.appendChild(align);
//     container.appendChild(newInputAllocine);
// });

// // Event quand on sélectionne le buttom de allocine
// selectElement_alloCine_n.addEventListener('change', (event) => {
//     container.removeChild(newTextAllocine);
//     container.removeChild(align);
//     container.removeChild(newInputAllocine);
// });


// Code test non utilisé (Note pour moi)
// var radio_url_alloCine = document.getElementById('radio_url_alloCine');
// var valeur = document.querySelector('input[name=radio_url_alloCine]').value;
// var valeur = document.getElementsByName('radio_url_alloCine');
// console.log("Valeur", valeur);
// for (var i = 0; i < valeur.length; i++) {
//     console.log('valeur[i]', valeur[i].checked);
//     console.log('valeur[i]', valeur[i].id);
//     if(valeur[i].checked && valeur[i].id === "radio_url_alloCine_y") {
//         console.log("true if");
//         // return false;
        // var newInput = document.createElement("input");

        // newInput.type = "text";
        // newInput.size = 30;

        // var conteneur = document.getElementById('url_alloCine_active');
        // conteneur.appendChild(newInput);
//     } else {
//         console.log('false else');
//     }
// }

// for (let i = 0; i < valeur.length; i++) {
//   console.log(valeur);
//   if (valeur[i].checked) {
//         console.log("j'ai cliquer");
//   }
//     valeur[i].addEventListener("change", console.log("test click"));
    
// }

// console.log(valeur.click);
// document.getElementsByName('radio_url_alloCine').addEventListener("click", console.log("test click"));

// valeur.addEventListener('click', function onClick() {
//     console.log('box clicked');
// });

// function displayDate() {
//     return console.log("Jesuis dans la fonction");
// }

// var testJS = document.getElementsByName('radio_url_alloCine');

// testJS.addEventListener('change', function(e){
//     console.log("e", e);
// });
