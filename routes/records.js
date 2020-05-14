const express = require('express');
const router = express.Router();
const Record = require('../models/Record');
const bodyParser = require('body-parser');
const recordsController = require('../controllers/recordsController');

//print list of all records in html
router.get('/allrecords', recordsController.allRecord);

//get all the records in json
router.get('/json', async(req,res)=>{
    try {
        const records = await Record.find();
        res.json(records);
    } catch (err) {
        res.json({message: err});
    }
});

//post a record
router.post('/', async(req,res) => {
    const record = new Record({
        moveType: req.body.moveType,
        moveNumber: req.body.moveNumber,
        quality: req.body.quality
    });
    try {
        const saveRecord = await record.save(); 
        res.json(saveRecord)
    } catch(err) {
        res.json({message: err})
    }   
});

//get a specific record
router.get('/:recordNumber', async(req,res) => {
    try {
        const record = await Record.findOne({moveNumber: req.params.recordNumber});
        res.json(record);
    } catch (err) {
        res.json({message: err});
    }
});

//delete a specific record
router.delete('/:recordNumber', async(req,res) => {
    try {
        const deletedRecord = await Record.remove({moveNumber: req.params.recordNumber});
        res.json(deletedRecord);
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;