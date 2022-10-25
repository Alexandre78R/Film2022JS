// Importpour generer le nom des images
var uniqid = require('uniqid');

// Import Cloudinary configuration
var cloudinary = require('../api/cloudinary.js');

// Import Fs
var fs = require('fs');

// Function pour upload l'image dans la backend
async function upload_img_local (data) {
    var nameFile = await uniqid();
    var resultCopy = await data.mv(`./${nameFile}.jpg`);
    if(!resultCopy) {
        console.log("File uploaded", resultCopy);
        return nameFile;
        } else {
            console.log('error');
            return false;
        }
}

// Function pour upload l'image sur l'hébergeur cloudinary
async function upload_img_cloudinary (imgName, folder) {
    var imagePath = './'+imgName+'.jpg';
    var resultCloudinary =  await cloudinary.cloudinary.uploader.upload(imagePath, {folder: folder});
    console.log("resultCloudinary",resultCloudinary);
    if (!resultCloudinary){
        return false;
    } else {
        return resultCloudinary;
    } 
}

// Function pour supprimer l'image sur l'hébergeur cloudinary
async function upload_img_cloudinary_del (public_id) {
    //  public_id dans resultCloudinary film2022/gbg0estcrfed7p1od7hl
    var resultCloudinarydel =  await cloudinary.cloudinary.uploader.destroy(public_id);
    console.log("resultCloudinarydel", resultCloudinarydel);
    if (!resultCloudinarydel) {
        return false;
    } else {
        return resultCloudinarydel;
    } 
}

// Function pour supprimer l'image du backend 
async function upload_img_local_del (image) {
    var filedel = await fs.unlinkSync(`./${image}.jpg`);
    if (filedel) {
        return false;
    } else {
        return filedel;
    } 
}

module.exports = { 
    upload_img_local : upload_img_local,
    upload_img_cloudinary : upload_img_cloudinary,
    upload_img_cloudinary_del : upload_img_cloudinary_del,
    upload_img_local_del : upload_img_local_del,
};