
function url_verif (url) {
    var regex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
    var isExisting = regex.test(url);
    return isExisting;
}

function email_verif(email) {
    var regex = /\+|\*|\$|^[a-zA-Z0-9_-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/gi;
    var isExisting = regex.test(email);
    return isExisting;
}

module.exports = {
    url_verif : url_verif,
    email_verif : email_verif,
};