const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//mongodb

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pauaaue.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    //
    const productCollection = client.db("emaJhon").collection("products");
    //setup api for getting all data from mongodb
    app.get("/products", async (req, res) => {
      //get size and page
      const page = req.query.page;
      const size = req.query.size;
      console.log(page, size);
      //all getting all data
      const query = {};
      const cursor = productCollection.find(query);
      //cursor er vitore je data gula ase seigula k to Array te convert korar jnne
      const products = await cursor.toArray();
      //if want to show only 10 products
      // const products = await cursor.limit(10).toArray();

      //use for pagination and count how much item available
      const count = await productCollection.estimatedDocumentCount();
      res.send({ count, products });
    });
  } finally {
  }
}
run().catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("ema jhon server is running");
});

app.listen(port, () => {
  console.log(`ema jhon running on:${port}`);
});
