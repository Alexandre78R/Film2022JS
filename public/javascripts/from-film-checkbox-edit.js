//Import function check format image
// var valid_image = require("./valid-image.js");
// import valid_image from './valid-image.js';

// Sélections des buttom Img
const selectElement_img = document.querySelector('#checkbox_img');

// Sélections des buttom Img
const selectElement_img_hidden = document.querySelector('#checkbox_img_hidden');

//Création de block Img
var align_img = document.createElement("br");
var newText_img = document.createElement("label");
var newInput_img = document.createElement("input");

// Param du label Img
newText_img.textContent = "Img Url";
// Param de l'imput Img Id
newInput_img.id = "file";
// Param de l'imput Img name
newInput_img.name = "file";
// Param de l'imput Img type
newInput_img.type = "file";


// Création sur container Img
var containerImg = document.getElementById('active_img');

// Count buttom Img
var countImg = 0;

// Si le button est checked par default on fait apparaitre les container
if (selectElement_img.checked == true) {
    containerImg.appendChild(newText_img);
    containerImg.appendChild(align_img);
    containerImg.appendChild(newInput_img);
    countImg++;
    
    if (selectElement_img.value === "on") {
        newInput_img.value = "";
    } else {
        newInput_img.value = selectElement_img.value;
    }
}

// Event quand on sélectionne le buttom Img
selectElement_img.addEventListener('change', (event) => {
    if (countImg == 0) {
        containerImg.appendChild(newText_img);
        containerImg.appendChild(align_img);
        containerImg.appendChild(newInput_img);
        console.log("newInput_img", newInput_img);
        countImg++;
        if (selectElement_img.value === "on") {
            newInput_img.value = "";
        } else {
            newInput_img.value = selectElement_img.value;
        }
        } else {
        containerImg.removeChild(newText_img);
        containerImg.removeChild(align_img);
        containerImg.removeChild(newInput_img);
        newInput_img.value = "";
        countImg--;
        if (selectElement_img.value === "on") {
            newInput_img.value = "";
        } else {
            newInput_img.value = selectElement_img.value;
        }
    }
});