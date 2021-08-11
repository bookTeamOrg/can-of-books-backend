const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa'); 
const mongoose = require('mongoose');
const { getBooks,createBook,deleteBook } = require('./controllers/Books.controller');
const PORT = process.env.PORT;
const JWKSURI = process.env.JWKSURI;
const MONGO_DB_URL = process.env.MONGO_DB_URL
mongoose.connect(`${MONGO_DB_URL}/books`, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useCreateIndex', true);
const {seedCusCollection} = require('./model/Customer.model');
// seedCusCollection();
app.use(cors());
app.use(express.json());

const client = jwksClient({
  jwksUri: JWKSURI
});
console.log(jwksClient);

function getKey(header, callback) {
  client.getSigningKey(header.kid, function (err, key) {
    var signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}



app.get('/verify-token', (request, response) => {
  
  const token = request.headers.authorization.split(' ')[1];
  // console.log(token);
  jwt.verify(token, getKey, {}, (error, user) => {

    if (error) {
      response.send('invalid token');
    }
    response.json(user);
  });
});

app.get('/books', getBooks);
app.post('/book', createBook);
app.delete('/book/:id',deleteBook);

app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});

