const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;
const app = express();


// middleware : 
app.use(cors());
app.use(express.json());


// connect to database : 



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.fm6zl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const run = async  () => {
    try{
        await client.connect();
        const productCollection = client.db("emaJohn").collection("product");

        app.get('/product',async(req,res)=>{
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

    } finally { 

    }
}

run().catch(console.dir)




// client.connect(err => {
  
//   // perform actions on the collection object
//   console.log('db connected')
//   client.close();
// });



app.get('/',(req,res)=>{
    res.send('banckend is running')
})

app.listen(port,()=>{
    console.log('server is running port , ',port);
})