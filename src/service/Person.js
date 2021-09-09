const moment = require('moment');
const PersonModel = require('../model/Person');
const HistoryModel = require('../model/History');

const createPersonService = async (request) => {
    try {
        let person = new PersonModel(request.payload);
        return await person.save();

    } catch (error) {
        return h.response(error).code(500);
    }
};


const getPersonListService = async (request) => {
    try {
        return await PersonModel.find().exec();
    } catch (error) {
        return h.response(error).code(500);
    }
};


const getPersonService = async (request) => {
    try {
        return await PersonModel.findById(request.params.id).exec();
    } catch (error) {
        return h.response({
            "statusCode": 500,
            "error": "Internal Server Error!",
            "message": error.message
        }).code(500);
    }
};


const updatePersonService = async (request) => {
    try {
        // let history = new HistoryModel(request.payload);
        // await history.save();
        return await PersonModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
    } catch (error) {
        return h.response(error).code(500);
    }
};


const deletePersonService = async (request) => {
    try {
        return await PersonModel.findByIdAndDelete(request.params.id);
    } catch (error) {
        return h.response(error).code(500);
    }
};


const getHistoryListService = async (request, h) => {

    /* With Corner Case */

    try {
        let certainDateFromNow = moment().subtract(1, 'minutes').toDate();
        let now = new Date();
        let noOfDocsInThisDateRange = await HistoryModel.countDocuments(
            { createdAt: { $gte: certainDateFromNow, $lte: now } });
        let minimumDocRequire = 4;
        let extraDocNeeded = 0;
        if (noOfDocsInThisDateRange < minimumDocRequire) {
            extraDocNeeded = minimumDocRequire - noOfDocsInThisDateRange;
        }

        let histories = await HistoryModel.find(
            { createdAt: { $lte: certainDateFromNow } },
            ' _id',
            { sort: { createdAt: -1 }, skip: extraDocNeeded },
        );

        return await HistoryModel.deleteMany({ _id: { $in: histories } });

    } catch (error) {
        return h.response(error).code(500);
    }


     /* With MongoDB Queries */

    // try {
    //     let certainDateFromNow = moment().subtract(10, 'minutes').toDate();

    // let histories = await HistoryModel.find(
    //     { createdAt: { $lte: certainDateFromNow } },
    //     null,
    //     { sort: { createdAt: -1 }, skip: 5 },

    //     function (err, docs) {
    //         docs.forEach(function (doc) {
    //             doc.remove();
    //         });
    //     }
    // );

    //     return histories;

    // } catch (error) {
    //     return h.response(error).code(500);
    // }



    /* With Plain JS Code */

    // try {
    //     let historyList = await HistoryModel.find().exec();
    //     let totalDocuments = historyList.length;  // await HistoryModel.collection.countDocuments();
    //     let CurrentDateInMilliSeconds = new Date().getTime();
    //     let historyDate;
    //     let historyDateInMilliSeconds;
    //     let differenceOfCurrentAndHistoryDate;


    //     let certainTime = 10000  // 7 days -> 604800000 ms
    //     let minimumDocuments = 5;

    //     if (totalDocuments > minimumDocuments) {
    //         for (let historyNum = 0; historyNum < historyList.length; historyNum++) {

    //             if(totalDocuments === minimumDocuments) break;

    //             historyDate = (historyList[historyNum].createdAt).toString();
    //             historyDateInMilliSeconds = new Date(historyDate).getTime();
    //             differenceOfCurrentAndHistoryDate = CurrentDateInMilliSeconds - historyDateInMilliSeconds;

    //             if (differenceOfCurrentAndHistoryDate > certainTime) {
    //                await HistoryModel.findByIdAndDelete(historyList[historyNum]._id);
    //             }

    //             totalDocuments = totalDocuments - 1;
    //         }
    //     }

    //     return await HistoryModel.find().exec();

    // } catch (error) {
    //     return h.response(error).code(500);
    // }
};


const deleteHistoryService = async (request) => {
    try {
        return await HistoryModel.findByIdAndDelete(request.params.id);
    } catch (error) {
        return h.response(error).code(500);
    }
};


const updatePersonAndSaveIntoHistoryService = async (request) => {
    try {
        let person = await PersonModel.findById(request.params.id);
        let history = new HistoryModel({
            firstname: person.firstname,
            lastname: person.lastname
        });
        history.save();

        return await PersonModel.findByIdAndUpdate(request.params.id, request.payload, { new: true });
    } catch (error) {
        return h.response(error).code(500);
    }
};




module.exports = {
    createPersonService,
    getPersonListService,
    getPersonService,
    updatePersonService,
    deletePersonService,
    getHistoryListService,
    deleteHistoryService,
    updatePersonAndSaveIntoHistoryService
}
