const express = require('express');
const cors = require('cors');
const parser = require('body-parser');
const createRouter = require('./helpers/create_router.js');
const MongoClient = require('mongodb').MongoClient;

const app = express();
app.use(parser.json());
app.use(cors());

MongoClient.connect("mongodb://localhost:27017")
.then((client) => {
  const db = client.db("shares_portfolio");
  const sharesCollection = db.collection('shares');
  const sharesRouter = createRouter(sharesCollection);

  app.use('/api/shares', sharesRouter);
})


app.listen(3000, function () {
  console.log(`Listening on port ${ this.address().port }`);
});
