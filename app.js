const express = require('express');
const app = express();
const layouts = require("express-ejs-layouts");
//#region templating resume
/*
templating engines - designed to combine templates with a data model to produce result documents
routes connections to views
EJS - Embedded JS, syntax for applying JS functions and variables within views
express-ejs-layouts --> to use dynamic layouts in application
*/
//#endregion 
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //to interprete JSON
//const cors = require('cors'); //to access API outside the local network
const usersController = require('./controllers/usersController'); //shows the list of all of the doctors na patients
const startController = require('./controllers/startController'); //shows sign in and lig in options
const recordsRoutes = require('./routes/records');
const homeRoutes = require('./routes/home');
const dbString = "mongodb://localhost:27017/D6";
app.set("view engine", "ejs");
mongoose.Promise = global.Promise; //want to use native ES6 promises

const fileServerMiddleware = express.static('public');
app.use('/', fileServerMiddleware);

//#region <db connection without using mongoose>
//const MongoDB = require('mongodb').MongoClient;
//const dbURL = "mongodb://localhost:27017";
//const dbName = "D6";
// MongoDB.connect(dbURL, (error, client)=>{ //set up connectio to the local database server
//     if(error) throw error;
//     let db = client.db(dbName); //get the "D6" database from the connection to the MongoDB server
//     db.collection("records")
//         .find() //find all records in the records collection
//         .toArray((error, data)=>{
//             if(error) throw error;
//             console.log(data); //prints the results to the console
//         });
//     console.log("\n ------------------------------------------ \n")
//     db.collection("records")
//     .insertOne({
//         type: "lift a cup",
//         quality: 1
//     }, (error,db)=>{
//         if(error) throw error
//         //console.log(db);
//     });    
// });
//#endregion

//Connect to db
mongoose.connect(dbString, { useNewUrlParser: true });
const db = mongoose.connection; //assign the database to the db cariable
db.once("open", () => {
    console.log("Connected to the database");
});

//#region Middlewares
//app.use(cors());
app.use(bodyParser.json());
app.use(layouts);
app.use(express.static("public"));
mongoose.set("useCreateIndex", true);
app.use(
    express.urlencoded({
        extended: false
    })
);
app.use(express.json());
//#endregion

//#region --Create and save models--
// const User = require('./models/User'); //instantiate new user
// var user1 = new User({
//     name: "Dan",
//     age: 55,
//     email: "dan@gmail.com"
// });
// user1.save((error, savedDocument) => {
//     if (error) console.log(error);
//     console.log(savedDocument);
// });

// User.create({
//     name: "Markus",
//     age: 65,
//     email: "markus@gmail.com"
// }, function (error, savedDocument) { //"function" syntax equivalent to "=>"" shortcut?
//     if (error) console.log(error);
//     console.log(savedDocument);
//});
//#endregion

//#region --query database--
// var myQuery = User.findOne({
//     name: "Dan"
// }).where("email", /@/);

// myQuery.exec((error, data) => {
//     if(data) console.log(data)
// });
//#endregion

//Records Routes and Controllers
app.use('/records', recordsRoutes);
app.use('/home', homeRoutes);

//Routes
app.get('/', startController.startPage); //shows login/start page

//start listening
app.listen(3000, () => {
    console.log('Server running at port 3000');
});