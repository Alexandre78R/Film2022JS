async function checkPath (req) {
    var path = "";
    // console.log("req", req);
    // console.log("req.baseurl", req.baseUrl);
    // console.log("req.originalUrl", req.originalUrl);
    // console.log("req.params", req.params);
    // if (req.baseUrl == ''){
    //     path = '/';
    //     return path;
    // } else 
    if (req.params.page == null || req.params.page == undefined){
        path = `${req.baseUrl}${req.path}`;
        return path;
    } else {
        path = `${req.baseUrl}${req.path}`;
        var pageNum = req.params.page;
        var newPath = path.replace(`/${pageNum}`, '');
        path = newPath;
        return path;
    }
}

module.exports  = { 
    checkPath : checkPath
};