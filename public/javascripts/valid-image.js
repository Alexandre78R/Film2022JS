function valid_image() { 
    var fichier = document.getElementById('file'); 
    var valeur = fichier.value; 
    var extensions = /(\.jpg|\.jpeg|\.png)$/i; 

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
