const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestión de Tareas',
      version: '1.0.0',
      description: 'API para gestionar tareas locales, externas y en Firebase',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.js'], // Escanea esta carpeta para leer los comentarios Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
