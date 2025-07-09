
const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/', require('./routes'));

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
      status: error.status
    }
  });
});

mongodb.initDb((err) => {
  if (err) {
    console.log('Database connection failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Database connected and server running on port ${port}`);
    });
  }
});