const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const TypeRouter = require('./routes/Type'); 
const { db } = require('./database');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('', TypeRouter);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

const port = 3010;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
