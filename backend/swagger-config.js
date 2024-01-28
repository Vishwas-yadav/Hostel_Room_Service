const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./modules/login/index.js',
  './modules/requests/index.js',
  './modules/user/index.js'] 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;


