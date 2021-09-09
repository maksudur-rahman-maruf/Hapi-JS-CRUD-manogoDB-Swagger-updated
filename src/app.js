const Hapi = require('@hapi/hapi');
const Mongoose = require("mongoose");
const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const Pack = require('../package');
const HapiSwagger = require('hapi-swagger');
const cors = require('cors');
const routes = require('./route/Person');


(async () => {
    const server = await new Hapi.Server({
        "host": "0.0.0.0",
        "port": 3003,
        "routes": { cors: true }
    });
    

    Mongoose.connect("mongodb://localhost/myhapidb", { useUnifiedTopology: true, useNewUrlParser: true });
    // Mongoose.connect(process.env.MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true });


    const swaggerOptions = {
        info: {
            title: 'Test API Documentation',
            version: Pack.version,
        },
    };

    await server.register([
        Inert,
        Vision,
        {
            plugin: HapiSwagger,
            options: swaggerOptions
        }
    ]);

    // server.connection({ routes: { cors: true } });

    server.route(routes);

    

    // server.route({
    //     config: {
    //         cors: {
    //             origin: ['*'],
    //             additionalHeaders: ['cache-control', 'x-requested-with']
    //         }
    //     },

    server.start();

})();