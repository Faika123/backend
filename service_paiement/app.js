const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors'); 
const PaiementRouter = require('./routes/Paiement');
const { db } = require('./database');

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('', PaiementRouter);

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

const port = 3011;
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
