//declare variables express, app, bodyParser(middleware) then app.use, MongoClient, require .env, PORT
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const PORT = process.env.PORT || 8000;
require("dotenv").config();
//add model variable

//set middleware
app.set("view engine", "ejs"); //this helps to convert to ejs
app.use(express.static("public")); // this helps it read folder public
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //this is added when we created PUT method to accept json data

//this tells the bodyparser to extract data from <form> element and add it to the body property of request object. eg: req.body
//setup MongoClient.connect
MongoClient.connect(process.env.DB_CONNECTION, { useUnifiedTopology: true })
  .then((client) => {
    console.log("connected to the database");
    const db = client.db("simple-quotes-demo"); //this is to name the database
    const quotesCollection = db.collection("quotes");

    //main structure of CRUD: these all should be in "then" of MongoClient.connect promise
    /* app.use(/ ... /);

    app.get(/  endpoint, callback /);
    endpoint is the requested endpoint localhost:3000/  "/" ---> this is the endpoint
    callback tells the server what to do when the requested endpoint matches the endpoint. It takes two arguments (request, response) 
    */
    app.get("/", (req, res) => {
      quotesCollection
        .find()
        .toArray()
        .then((result) => {
          console.log(result);
          res.render("index.ejs", { quotes: result });
        })
        .catch((error) => console.error(error));
    }),
      //app.post(/* ... */) define POST request handler

      app.post("/quotes", (req, res) => {
        quotesCollection
          .insertOne(req.body) //We can use the insertOne method to add items into a MongoDB collection.

          .then((result) => {
            console.log(result);
            res.redirect("/");
          })
          .catch((error) => console.error(error));
      }),
      //app.put
      app.put("/quotes", (req, res) => {
        quotesCollection
          //.findOneAndUpdate(query, update, options);
          //query lets us filter the collection with key-value pairs.
          //update, tells MongoDB what to change. It uses MongoDB’s update operators like $set, $inc and $push.
          //options tells MongoDB to define additional options for this update request.
          //upsert means: Insert a document if no documents can be updated.
          .updateOne(
            { name: "michael" },
            {
              $set: {
                quote: req.body.quote,
                name: req.body.name,
              },
            },
            {
              upsert: true,
            }
          )
          .then((result) => {
            res.json("Success");
          })
          .catch((error) => console.error(error));
      }),
      //app.delete(/* ... */)
      app.delete("/quotes", (req, res) => {
        //MongoDB Collections has a method called deleteOne.
        //It lets us remove a document from the database.
        //It takes in two parameters: query and options.
        quotesCollection
          .deleteOne({ name: req.body.name })
          .then((result) => {
            if (result.deletedCount === 0) {
              return res.json("No quote to delete");
            }
            res.json(`Deleted ${req.body.name}'s quote`);
          })
          .catch((error) => console.error(error));
      }),
      //app.listen(/* ... */) start server
      app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  })

  .catch((error) => console.log(error));
