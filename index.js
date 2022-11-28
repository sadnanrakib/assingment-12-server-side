const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config();
const port = process.env.PORT || 5000;


const app = express()

// resaledb
// J2wHd32HmhcJ_Lm

app.use(cors());
// app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.tsk4obg.mongodb.net/?retryWrites=true&w=majority`;
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASSWORD);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        const PhonesCollection = client.db("resaleProduct").collection("category");

        

        app.get('/allcategory/:category', async(req, res)=>{
          const category = req.params.category
          // console.log(category)
          const query = {category}
          const result = await PhonesCollection .find(query).toArray()
          res.send(result)
        })

        app.post('/addphone',async(req, res)=>{
          const books =req.body;
          const result = await PhonesCollection .insertOne(books)
          res.send(result)
      })
    }
    finally{

    }
}

app.get("/", async (req, res) => {
    res.send("Assingment 12 is Running");
  });
  
  app.listen(port, () => {
    console.log(`Resale Market is Running ${port}`);
  });

  run().catch(err=>console.error(err))