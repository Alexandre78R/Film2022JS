function url_verif (url) {
    var regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    var isExisting = regex.test(url);
    return isExisting;
}

function email_verif(email) {
    // ^[a-zA-Z-]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$#
    // var regex = /^[a-zA-Z-]+@[a-zA-Z-]+\.[a-zA-Z]{2,6}$#;
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // var regex = /\+|\*|\$|^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/gi;
    var isExisting = regex.test(email);
    return isExisting;
}

function name_verif (name) {
    var regex = /\b([a-zA-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/gm;
    var isExisting = regex.test(name);
    return isExisting;
}

module.exports = {
    url_verif : url_verif,
    email_verif : email_verif,
    name_verif : name_verif,
};