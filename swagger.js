const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Russell',
            version: '1.0.0',
            description: 'Documentation de l\'API de gestion des catways'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ]
    },
    apis: ['./routes/*.js']
};

module.exports = swaggerJsdoc(options);