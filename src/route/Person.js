const PersonModel = require('../model/Person');
const PersonValidation = require('../validation/Person');
const PersonHandler = require('../handler/Person');
const Joi = require('joi');


const routes = [
    {
        method: "POST",
        path: "/person",
        options: {
            description: 'Create Person ',
            notes: 'Create a individual person',
            tags: ['api'],
            validate: {
                payload: PersonValidation.personValidateSchema
            },
            handler: PersonHandler.createPerson
        }
        
    },
    

    {
        method: 'POST',
        path: '/submit',
        options: {
            description: 'File Subimitting ',
            notes: 'Submit a file',
            tags: ['api'],
            validate: {
                payload: Joi.object({
                    file: Joi.any()
                        .meta({ swaggerType: 'file' })
                        .description('csv file')
                })
            },
            payload: {
                output: 'stream',
                parse: true,
                // allow: 'multipart/form-data'
                multipart: true,
                maxBytes: 1024 * 1024 * 100,
                
            },
    
            handler: (request, h) => {
    
                const data = request.payload;
                if (data.file) {
                    console.log(data.file._data.toString())
                }
                return data.file._data.toString();
        
            },
    
            plugins: {
                'hapi-swagger': {
                  payloadType: 'form',
                  responseMessages: [
                    { 'code': 500, 'message': 'Internal Server Error'}
                  ]
                }
            },
    
        }
    },


    {
        method: "GET",
        path: "/people",
        options: {
            description: 'Get Person List',
            notes: 'Returns Person list',
            tags: ['api'],
            handler: PersonHandler.getPersons
        }
        
    },


    {
        method: "GET",
        path: "/person/{id}",
        options: {
            description: 'Get Individual Person ',
            notes: 'Returns a Person by the id passed in the path',
            tags: ['api'],
            validate: {
                 params:PersonValidation.personValidateId
            },
            handler: PersonHandler.getPersonById
        }
       
    },


    {
        method: "PUT",
        path: "/person/{id}",
        options: {
            description: 'Update  Person ',
            notes: 'Update a Person by the id passed in the path',
            tags: ['api'],
            validate: {
                params: PersonValidation.personValidateId,
                payload: PersonValidation.personValidateSchemaForUpdate
               
            },
            handler: PersonHandler.updatePerson
        }
        
    },


    {
        method: "DELETE",
        path: "/person/{id}",
        options: {
            description: 'Delete Person',
            notes: 'Delete a specific person',
            tags: ['api'],
            validate: {
                params: PersonValidation.personValidateId
            },
            handler: PersonHandler.deletePerson
        }
        
    },


    {
        method: "GET",
        path: "/History",
        options: {
            description: 'Get Persons History List',
            notes: 'Returns Persons History list',
            tags: ['api'],
            handler: PersonHandler.getHistories
        }
        
    },


    {
        method: "DELETE",
        path: "/History/{id}",
        options: {
            description: 'Delete History By Id',
            notes: 'Delete a specific History',
            tags: ['api'],
            validate: {
                params: PersonValidation.personValidateId
            },
            handler: PersonHandler.deleteHistory
        }
        
    },


    {
        method: "PUT",
        path: "/person/history/{id}",
        options: {
            description: 'Update  Person and Store into History',
            notes: 'Update a Person by the id passed in the path and Store into History',
            tags: ['api'],
            validate: {
                params: PersonValidation.personValidateId,
                payload: PersonValidation.personValidateSchemaForUpdate
               
            },
            handler: PersonHandler.updatePersonAndSaveIntoHistory
        }
        
    },
];


module.exports =  routes
