const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Russell Marina",
            version: "1.0.0",
            description: "API de gestion des catways, réservations et utilisateurs du port de plaisance Russell"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Serveur local"
            },
            {
                url: "https://russell-app.onrender.com",
                description: "Serveur Render"
            }
        ]
    },
    apis: [
        "./routes/api/*.js"
    ]
};

module.exports = swaggerJSDoc(options);