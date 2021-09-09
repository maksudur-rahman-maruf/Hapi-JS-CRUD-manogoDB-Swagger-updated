const PersonModel = require('../model/Person');
const PersonService = require('../service/Person');


const createPerson = async (request, h) => {
    let result = await PersonService.createPersonService(request);
    return h.response(result);
};

const getPersons = async (request, h) => {
    let persons = await PersonService.getPersonListService(request);
    return h.response(persons);
}

const getPersonById = async (request, h) => {
    let person = await PersonService.getPersonService(request);
    return h.response(person);
}

const updatePerson = async (request, h) => {
    let person = await PersonService.updatePersonService(request);
    return h.response(person);
}

const deletePerson = async (request, h) => {
    let person = await PersonService.deletePersonService(request);
    return h.response(person);
}


const getHistories = async (request, h) => {
    let persons = await PersonService.getHistoryListService(request);
    return h.response(persons);
}

const deleteHistory = async (request, h) => {
    let person = await PersonService.deleteHistoryService(request);
    return h.response(person);
}

const updatePersonAndSaveIntoHistory = async (request, h) => {
    let history = await PersonService.updatePersonAndSaveIntoHistoryService(request);
    return h.response(history);
}


module.exports = {
    createPerson,
    getPersons,
    getPersonById,
    updatePerson,
    deletePerson,
    getHistories,
    deleteHistory,
    updatePersonAndSaveIntoHistory
}

