const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 8000;

const app = express();
app.use(bodyParser.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ihxuz.mongodb.net/likePost?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const likeCollection = client.db("likePost").collection("likes");
  const unLikeCollection = client.db("likePost").collection("unLikes");
  app.post("/likedPost", (req, res) => {
    const selectedPost = req.body;
    likeCollection.insertMany(selectedPost)
      .then(result => {
        res.send(result);
      })
  })
  app.get('/likedPost', (req, res) => {
    likeCollection.find({})
      .toArray((error, docs) => {
        res.send(docs);
      })
  });
  app.post("/unLikedPost", (req, res) => {
    const selectedPost = req.body;
    unLikeCollection.insertMany(selectedPost)
      .then(result => {
        res.send(result);
      })
  })
  app.get('/unLikedPost', (req, res) => {
    unLikeCollection.find({})
      .toArray((error, docs) => {
        res.send(docs);
      })
  });
});

app.get('/', (req, res) => {
    res.send('welcome to post collection')
})

app.listen(port, () => {
    console.log(`we are at http://localhost:${port}`)
})