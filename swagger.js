const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',  // Changed title
    description: 'Contacts API'
  },
  host: `localhost:${process.env.PORT || 3000}`, // Dynamic port
  schemes: ['http'] // Removed https
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);