//------Records Page--------
const Record = require('../models/Record');

exports.allRecord = (req, res) => { //print out the list of patients
    Record.find({}, (error, recordsList) => {
        if (error) console.log(error); //if an error occures - send it to the next middleware function
        res.render("listRecords", {
            records: recordsList
        }); //set the data to the request object
    });
};

// exports.addPatient = (req, res) => { //add a new patient page
//     res.render("addPatient");
// };

// exports.savePatient = (req, res) => { //save a new patient
//     var newPatient = new User({
//         name: req.body.name,
//         age: req.body.age
//     });
    
//     newPatient.save((error, result) => {
//         if (error) res.send(error);
//         console.log(result);
//         res.render("newPatient", { patient: result });
//     });
// };

// //exported callback function to return usres from the database
// exports.getAllUsers = (req, res) => {
//     User.find({})
//         .exec() //return the promise from the find query
//         .then((users) => {
//             res.send(users);
//         }) //send save data to the next then code block
//         .catch((error) => {
//             console.log(error.message);
//             return [];
//         })
//         .then(() => {
//             console.log("Promise complete");
//         });
// };