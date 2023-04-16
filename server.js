//declare variables express, app, bodyParser(middleware) then app.use, MongoClient, require .env
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const PORT = 8000;
require("dotenv").config();
//add model variable

//set middleware
app.set("view engine", "ejs"); //this helps to convert to ejs
app.use(express.static("public")); // this helps it read folder public
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

//this tells the bodyparser to extract data from <form> element and add it to the body property of request object. eg: req.body
//setup MongoClient.connect
MongoClient.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true })
  .then(
    (client) => {
      console.log("connected to the database");
      const db = client.db("office-quotes"); //this is to name the database
      const quotesCollection = db.collection("quotes");
    },
    //main structure of CRUD: these all should be in "then" of MongoClient.connect promise
    /* app.use(/ ... /);

    app.get(/  endpoint, callback /);
    endpoint is the requested endpoint localhost:3000/  "/" ---> this is the endpoint
    callback tells the server what to do when the requested endpoint matches the endpoint. It takes two arguments (request, response) 
    */
   app.get('/', (req, res) => {
    res.render()
   })

    //app.post(/* ... */);
    app.post("/", (req, res) => {
      quotesCollection
        //We can use the insertOne method to add items into a MongoDB collection.
        .instertOne(req.body)
        .then((result) => {
            res.redirect('/')
          console.log(result);
        })
        .catch((error) => console.log(error));
    }),
    //app.listen(/* ... */);
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
  )

  .catch((error) => console.log(error));

