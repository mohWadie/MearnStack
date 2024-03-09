const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const prods = require('./controllers/products');
const users = require('./controllers/users');
require('dotenv/config');

app.use('/', prods);
app.use('/users', users);

mongoose.set('strictQuery', true);
mongoose.connect(
    process.env.DB_CONNECTION
).then(
    () => { console.log("Database connected") },
    err => { console.log(err) }
  );

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`*********** Server Runing on port ${port} ***********`);
});