const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
const ContactRouter = require('./routes/Contact');
const { db } = require('./database');

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('', ContactRouter);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

const port = 3009;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
