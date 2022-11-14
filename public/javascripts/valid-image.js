function valid_image() { 
    var fichier = document.getElementById('file'); 
    var valeur = fichier.value; 
    var extensions = /(\.jpg|\.jpeg|\.png)$/i; 

    // console.log("fichier", fichier);
    // console.log('valeur', valeur);
    // console.log("extensions.exec(valeur)", extensions.exec(valeur)[0]);

    if (!extensions.exec(valeur)) { 
        console.log('Format de fichier non valide');
        alert('Format de fichier non valide');
        fichier.value = ''; 
        return false; 
    }  else  { 
        if (fichier.files && fichier.files[0]) { 
            // alert('Format de fichier valide');
            console.log('Format de fichier valide');
        } 
    } 
}

// module.exports = {
//     valid_image : valid_image
// };
