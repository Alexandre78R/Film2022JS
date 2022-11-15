var results = {};

// Import function checkPatch
var checkPath = require("./checkPatch.js");

// Function pagination 
async function pagination (req, model, limitPage) {
    
    var perPage = limitPage;
    var total =  await model.countDocuments().exec();
    var pages = Math.ceil(total / perPage);
    var pageNumber = (req.params.page == null || req.params.page == undefined) ? 1 : parseInt(req.params.page);
    var startFrom = (pageNumber - 1) * perPage;
    var endIndex = pageNumber + 1;
    var previousResult = pageNumber - 1;
    var searchModel = await model.find().limit(perPage).skip(startFrom).exec();
    var dataPage = {
        pageFinish : pages,
        current : pageNumber,
    };

    if (!searchModel) {
        results.path = path;
        results.param = dataPage;
        results.results = false;
        return  results;
    } else {
        if (dataPage.current == 1){
        } else if (previousResult == 1) {
        } else {
            dataPage.start = 1;
        }

        if (endIndex == dataPage.current) {
        } else if (dataPage.current > endIndex && dataPage.current == 1) {
        } else if (pages+1 == endIndex) {
        } else {
            dataPage.next = endIndex;
        }
        // console.log("previousResult", previousResult);
        // var checkpreviousResult = previousResult;
      
        // console.log("addOnepreviousResult", addOnepreviousResult);
        if (dataPage.current == previousResult) {
        } else if (dataPage.current > previousResult && dataPage.current == 1) {
        } else {
            dataPage.previous = previousResult == 0 ? 1 : previousResult;
        }

        if (dataPage.current == pages) {
        } else if (endIndex == pages) {
        } else if (dataPage.start == pages) {
        } else {
            dataPage.pages = pages;
        }

        var path = await checkPath.checkPath(req);
        results.path = path;
        results.param = dataPage;
        results.results = searchModel;
        return results;
    }

    // var page = (req.params.page == null) ? 1 : parseInt(req.params.page);
    // var limit = limitPage;

    // var startIndex = (page - 1) * limit;
    // var endIndex = page * limit;

    // if (endIndex < await model.countDocuments().exec()) {
        // results.next = {
        //     page: endIndex,
        //     limit: limit
        // };
    // }
    
    // if (startIndex > 0) {
    //     results.previous = {
    //         page: page - 1,
    //         limit: limit
    //     };
    // }

    // var searchModel = await model.find().limit(limit).skip(startIndex).exec();
    // if (!searchModel) {
    //     results.results = false;
    //     return  results;
    // } else {
    //     results.results = searchModel;
    //     return results;
    // }
}

module.exports =  {
    pagination : pagination,
};