const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const ReserveRouter = require('./routes/Reservation');
const { db } = require('./database');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('', ReserveRouter);


db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

const port = 3007;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});


