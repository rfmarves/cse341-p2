const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

function isInvalidObjectId(id){
  //from https://www.geeksforgeeks.org/node-js/how-to-check-if-a-string-is-valid-mongodb-objectid-in-node-js/
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return false;
        return true;
    }
    return true;
}

const getAll = (req, res) => {
//#swagger.tags=['Events']
  try {
    mongodb
    .getDb()
    .db()
    .collection('events')
    .find()
    .toArray((err, lists) => {
      if (err) {
        res.status(400).json({ message: err});
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching events.' });
  }
};

const getSingle = (req, res) => {
//#swagger.tags=['Events']
  try{
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json('Invalid ID.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('events')
      .find({ _id: userId})
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the event.' });
  }
};

const createEvent = async (req, res) => {
//#swagger.tags=['Events']
  try {
    const event = {
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      startTime: req.body.startTime,
      capacity: req.body.capacity,
      location: req.body.location
    };
    const response = await mongodb.getDb().db().collection('events').insertOne(event);
    if (response.acknowledged) {
      res.status(201).json(response);
    } else {
      res.status(500).json(response.error || 'Some error occurred while creating the event.');
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the event.' });
  }
};

const updateEvent = async (req, res) => {
//#swagger.tags=['Events']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json('Invalid ID.');
    }
    const userId = new ObjectId(req.params.id);
    const event = {
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      startTime: req.body.startTime,
      capacity: req.body.capacity,
      location: req.body.location
    };
    const response = await mongodb
      .getDb()
      .db()
      .collection('events')
      .replaceOne({ _id: userId }, event);
    console.log(response);
    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while updating the event.');
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the event.' });
  }
};

const deleteEvent = async (req, res) => {
//#swagger.tags=['Events']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json('Invalid ID.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('events').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the event.');
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the event.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createEvent,
  updateEvent,
  deleteEvent
};
