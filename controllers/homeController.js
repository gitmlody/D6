//------Users Page--------
const User = require('../models/User');

exports.listofPatients = (req, res) => { //print out the list of patients
    User.find({}, (error, patientsList) => {
        if (error) console.log(error); //if an error occures - send it to the next middleware function
        res.render("list", {
            patients: patientsList
        }); //set the data to the request object
    });
};

exports.addPatient = (req, res) => { //add a new patient page
    res.render("addPatient");
};

exports.savePatient = (req, res) => { //save a new patient
    var newPatient = new User({
        name: req.body.name,
        age: req.body.age
    });
    
    newPatient.save((error, result) => {
        if (error) res.send(error);
        console.log(result);
        res.render("newPatient", { patient: result });
    });
};

//exported callback function to return usres from the database
exports.getAllUsers = (req, res) => {
    User.find({})
        .exec() //return the promise from the find query
        .then((users) => {
            res.send(users);
        }) //send save data to the next then code block
        .catch((error) => {
            console.log(error.message);
            return [];
        })
        .then(() => {
            console.log("Promise complete");
        });
};
// exports.getAllUsers = (req, res, next) => {
//     User.find({}, (error, users) => {
//         if (error) next(error); //if an error occures - send it to the next middleware function
//         req.data = users; //set the data to the request object
//         res.send(users)
//         next(); //next this object can be accessed by the next function in the middleware chain
//     });
// };