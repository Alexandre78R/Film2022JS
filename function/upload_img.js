// Importpour generer le nom des images
var uniqid = require('uniqid');

// Import Cloudinary configuration
var cloudinary = require('../api/cloudinary.js');

// Import Fs
var fs = require('fs');

var reponse = {};

// Function pour upload l'image dans la backend
async function upload_img_local (data) {

    var nameFile = await uniqid();

    var resultCopy = await data.mv(`./${nameFile}.jpg`);

    if(!resultCopy) {
        reponse.status = true;
        reponse.text = "L'image à était télécharger sur notre serveur !";
        reponse.data = nameFile;
        return reponse;
    } else {
        reponse.status = false;
        reponse.text = "Impossible de télécharger l'image sur notre serveur !";
        reponse.data = nameFile;
        return reponse;
    }
}

// Function pour upload l'image sur l'hébergeur cloudinary
async function upload_img_cloudinary (imgName, folder) {

    var imagePath = './'+imgName+'.jpg';

    var resultCloudinary =  await cloudinary.cloudinary.uploader.upload(imagePath, {folder: folder});

    if (!resultCloudinary){
        reponse.status = false;
        reponse.text = "Impossible de télécharger l'image sur notre hébergeur !";
        reponse.data = resultCloudinary;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "L'image à était télécharger sur notre hébergeur !";
        reponse.data = resultCloudinary;
        return reponse;
    } 
}

// Function pour supprimer l'image sur l'hébergeur cloudinary
async function del_img_cloudinary (public_id) {
    //  public_id dans resultCloudinary film2022/xxxxxxxxxxxx

    var resultCloudinarydel =  await cloudinary.cloudinary.uploader.destroy(public_id);
    console.log("resultCloudinarydel", resultCloudinarydel);

    if (resultCloudinarydel.result === "not found"){
        reponse.status = false;
        reponse.text = "Impossible de suprimmer l'image sur notre hébergeur !";
        reponse.data = resultCloudinarydel;
        return reponse;
    } else {
        reponse.status = true;
        reponse.text = "L'image à était suprimmer sur notre hébergeur !";
        reponse.data = resultCloudinarydel;
        return reponse;
    } 
}

// Function pour supprimer l'image du backend 
async function del_img_local (image) {

    console.log("upload_img_local_del ---> image", image);
    var filedel = await fs.unlinkSync(`./${image}.jpg`);

    if(!filedel) {
        reponse.status = true;
        reponse.text = "L'image à était suprimmer sur notre serveur !";
        reponse.data = filedel;
        return reponse;
    } else {
        reponse.status = false;
        reponse.text = "Impossible de suprimmer l'image sur notre serveur !";
        reponse.data = filedel;
        return reponse;
    }
}

module.exports = { 
    upload_img_local : upload_img_local,
    upload_img_cloudinary : upload_img_cloudinary,
    del_img_cloudinary : del_img_cloudinary,
    del_img_local : del_img_local,
};