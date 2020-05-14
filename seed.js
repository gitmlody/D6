const mongoose = require("mongoose"),
    User = require("./models/User"),
    Record = require("./models/Record");

mongoose.connect(
    "mongodb://localhost:27017/D6",
    { useNewUrlParser: true }
);

mongoose.connection;

var users = [
    {
        name: "patinet1",
        age: 60,
        email: "patien1@gmail.com"
    },
    {
        name: "patinet2",
        age: 65,
        email: "patien2@gmail.com"
    },
    {
        name: "patinet3",
        age: 70,
        email: "patien3@gmail.com"
    },
    {
        name: "patinet4",
        age: 75,
        email: "patien4@gmail.com"
    },
    {
        name: "patinet5",
        age: 80,
        email: "patien5@gmail.com"
    },
];

var records = [
    {
        moveType: "lift a cup",
        moveNumber: "1",
        quality: 2,
    },
    {
        moveType: "lift a cup",
        moveNumber: "2",
        quality: 5,
    },
    {
        moveType: "lift a cup",
        moveNumber: "3",
        quality: 8,
    },
    {
        moveType: "swing",
        moveNumber: "4",
        quality: 7,
    },
    {
        moveType: "lift a cup",
        moveNumber: "5",
        quality: 10,
    }
];

User.deleteMany()
    .exec()
    .then(() => {
        console.log("User data is empty");
    });

Record.deleteMany()
    .exec()
    .then(() => {
        console.log("Record data is empty");
    });

var commands = [];
users.forEach((u) => {
    commands.push(User.create({
        name: u.name,
        age: u.age,
        email: u.email
    }));
});

var commands2 = [];
records.forEach((r) => {
    commands2.push(Record.create({
        moveType: r.moveType,
        moveNumber: r.moveNumber,
        quality: r.quality
    }));
});

// var commands2 = [];
// records.forEach((r) => {
//     var someuser;
//     User.findOne().select('_id')
//         .then(user => {
//             someuser = user;
//             console.log(someuser);
//         });
//     commands2.push(Record.create({
//         moveType: r.moveType,
//         moveNumber: r.moveNumber,
//         quality: r.quality,
//         user: someuser
//     }));
//     console.log(someuser)
// });

// Record.find({}, (error, records) => {
//     if (error) console.log(error);
//     console.log(records)
//     records.map(record => {
//         User.findOne({})
//             .then(someuser => {
//                 Record.populate(someuser, "user");
//             });
//     });
// });

Promise.all(commands) // confirmation after all previous promises resolved
    .then(c => {
        console.log("\n\n");
        console.log(JSON.stringify(c));
    })
    .catch(error => {
        console.log(`Error: ${error}`);
    });

Promise.all(commands2) // confirmation after all previous promises resolved
    .then(c => {
        console.log("\n\n");
        console.log(JSON.stringify(c));
        mongoose.connection.close();
    })
    .catch(error => {
        console.log(`Error: ${error}`);
    });