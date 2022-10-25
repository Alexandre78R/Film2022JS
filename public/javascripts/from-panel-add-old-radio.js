// Code dernière version fonctionnel
// Sélections des buttom radio
const selectElement_alloCine_y = document.querySelector('#radio_url_alloCine_y');
const selectElement_alloCine_n = document.querySelector('#radio_url_alloCine_n');

const selectElement_senscritique_y = document.querySelector('#radio_url_senscritique_y');
const selectElement_senscritique_n = document.querySelector('#radio_url_senscritique_n');

// Sélections des buttom radio
const selectElement_cineseries_y = document.querySelector('#radio_url_cineseries_y');
const selectElement_cineseries_n = document.querySelector('#radio_url_cineseries_n');

//Création de block html pur sauter une ligne
var alignAllocine = document.createElement("br");

// Création de
var newTextAllocine = document.createElement("label");
var newInputAllocine = document.createElement("input");

// Param du label qu'on a créer juste avant 
newTextAllocine.textContent = "Url AlloCiné";
// Param de l'imput qu'on a créer juste avant 
newInputAllocine.size = 30;
newInputAllocine.placeholder = "https://exemple.com";
newInputAllocine.name = "url_alloCine";

var alignSenscritique = document.createElement("br");
// Création de
var newTextSenscritique = document.createElement("label");
var newInputSenscritique = document.createElement("input");

// Param du label qu'on a créer juste avant 
newTextSenscritique.textContent = "Url Senscritique";
// Param de l'imput qu'on a créer juste avant 
newInputSenscritique.size = 30;
newInputSenscritique.placeholder = "https://exemple.com";
newInputSenscritique.name = "url_senscritique";


//Création de block html pur sauter une ligne
var alignCineseries = document.createElement("br");

// Création de
var newTextCineseries = document.createElement("label");
var newInputCineseries = document.createElement("input");

// Param du label qu'on a créer juste avant 
newTextCineseries.textContent = "Url Cineseries";
// Param de l'imput qu'on a créer juste avant 
newInputCineseries.size = 30;
newInputCineseries.placeholder = "https://exemple.com";
newInputCineseries.name = "url_cineseriese";

// Création sur container pour le placement de nos création label et input
var containerAllocine = document.getElementById('url_alloCine_active');
var containerSenscritique = document.getElementById('url_senscritique_active');
var containerCineseries = document.getElementById('url_cineseries_active');
// container.className = "structure-contact";

// Event quand on sélectionne le buttom y de allocine
selectElement_alloCine_y.addEventListener('change', (event) => {
    containerAllocine.appendChild(newTextAllocine);
    containerAllocine.appendChild(alignAllocine);
    containerAllocine.appendChild(newInputAllocine);
});

// Event quand on sélectionne le buttom de allocine
selectElement_alloCine_n.addEventListener('change', (event) => {
    containerAllocine.removeChild(newTextAllocine);
    containerAllocine.removeChild(alignAllocine);
    containerAllocine.removeChild(newInputAllocine);
});


// Event quand on sélectionne le buttom y de allocine
selectElement_senscritique_y.addEventListener('change', (event) => {
    containerSenscritique.appendChild(newTextSenscritique);
    containerSenscritique.appendChild(alignSenscritique);
    containerSenscritique.appendChild(newInputSenscritique);
});

// Event quand on sélectionne le buttom de allocine
selectElement_senscritique_n.addEventListener('change', (event) => {
    containerSenscritique.removeChild(newTextSenscritique);
    containerSenscritique.removeChild(alignSenscritique);
    containerSenscritique.removeChild(newInputSenscritique);
});


// Event quand on sélectionne le buttom y de allocine
selectElement_cineseries_y.addEventListener('change', (event) => {
    containerCineseries.appendChild(newTextCineseries);
    containerCineseries.appendChild(alignCineseries);
    containerCineseries.appendChild(newInputCineseries);
});

// Event quand on sélectionne le buttom de allocine
selectElement_cineseries_n.addEventListener('change', (event) => {
    containerCineseries.removeChild(newTextCineseries);
    containerCineseries.removeChild(alignCineseries);
    containerCineseries.removeChild(newInputCineseries);
});
