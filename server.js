// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 3000;
const app = express();
const cors = require('cors');

app
  .use(bodyParser.json())
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-api-key']
  }))
  .use((req, res, next) => {
    // This is an additional middleware to handle OPTIONS requests
    if (req.method === 'OPTIONS') {
      res.status(200).send();
    } else {
      next();
    }
  })
  .use('/', require('./routes'));

// Error handling middleware should be after all other middleware and routes
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});