const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "API Russell Marina",
            version: "1.0.0",
            description: "API gestion catways, réservations et utilisateurs"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Serveur local"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: []
            }
        ]
    },

    apis: [
        "./routes/api/*.js"
    ]
};

module.exports = swaggerJSDoc(options);