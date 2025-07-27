const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Ticketing API',
    description: 'API for ticking data as project2 for CSE 341'
  },
  host: 'https://ticketing-api-kaep.onrender.com',
  schemes: ['https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
