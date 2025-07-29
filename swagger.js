const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'CSE341 Web Services API',
    description: 'API for managing contacts and books, built for CSE341.'
  },
  host: `localhost:${process.env.PORT || 3000}`,
  schemes: ['http'],
  tags: [
    {
      name: 'Contacts',
      description: 'API for contacts in the database'
    },
    {
      name: 'Books',
      description: 'API for books in the database'
    }
  ],
  definitions: {
    Contact: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      favoriteColor: 'Blue',
      birthday: '1990-01-01'
    },
    Book: {
      title: 'The Example Book',
      author: 'Jane Doe',
      publication_year: 2020,
      genre: ['Fiction', 'Drama'],
      pages: 300,
      publisher: 'Example Publishing',
      language: 'English',
      isbn: '1234567890123',
      rating: 4.5,
      movie_adaptation: false,
      series: 'Example Series'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js']; // swagger-autogen will read all routes from index.js

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    require('./server.js'); // This will start your server after swagger.json is generated
});