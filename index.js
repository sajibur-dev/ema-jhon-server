const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;
const app = express();

// middleware :
app.use(cors());
app.use(express.json());

// connect to database :

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fm6zl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

const run = async () => {
  try {
    await client.connect();
    const productCollection = client.db("emaJohn").collection("product");

    app.get("/product", async (req, res) => {
      const page = +req.query.page;
      const size = +req.query.size;

      const query = {};
      const cursor = productCollection.find(query);

      const products =
        page || size
          ? await cursor
              .skip(page * size)
              .limit(size)
              .toArray()
          : await cursor.toArray();
      res.send(products);
    });

    app.get("/productCount", async (req, res) => {
      const count = await productCollection.estimatedDocumentCount();
      res.send({ count });
    });


    app.post('/productKeys',async(req,res) => {
        console.log(req.body);
        const keys = req.body;
        const ids = keys.map((id) => ObjectId(id))
        const query = {_id:{$in : ids}};
        const cursor = productCollection.find(query);
        const products = await cursor.toArray();
        res.send(products);
    })


  } finally {
  }
};

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("banckend is running");
});

app.listen(port, () => {
  console.log("server is running port , ", port);
});
