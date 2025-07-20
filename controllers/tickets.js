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
//#swagger.tags=['Tickets']
  try {
    mongodb
      .getDb()
      .db()
      .collection('tickets')
      .find()
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching tickets.' });
  }
};

const getSingle = (req, res) => {
//#swagger.tags=['Tickets']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json('Invalid ID.');
    }
    const userId = new ObjectId(req.params.id);
    mongodb
      .getDb()
      .db()
      .collection('tickets')
      .find({ _id: userId})
      .toArray((err, lists) => {
        if (err) {
          res.status(400).json({ message: err});
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
      });
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching the ticket.' });
  }
};

const createTicket = async (req, res) => {
//#swagger.tags=['Tickets']
  try {
    if (isInvalidObjectId(req.body.eventId)) {
      res.status(400).json('Invalid Event ID.');
    } else {
      const ticket = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      eventId: req.body.eventId,
      amountPaid: req.body.amountPaid,
      purchaseDate: req.body.purchaseDate,
      paymentMethod: req.body.paymentMethod,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      status: "registered",
      };
      const response = await mongodb.getDb().db().collection('tickets').insertOne(ticket);
      if (response.acknowledged) {
        res.status(201).json(response);
      } else {
        res.status(500).json(response.error || 'Some error occurred while creating the ticket.');
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while creating the ticket.' });
  }
};

const updateTicket = async (req, res) => {
//#swagger.tags=['Tickets']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json('Invalid ID.');
    }
    if (isInvalidObjectId(req.body.eventId)) {
      res.status(400).json('Invalid Event ID.');
    } else {
      const userId = new ObjectId(req.params.id);
      const ticket = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      eventId: req.body.eventId,
      amountPaid: req.body.amountPaid,
      purchaseDate: req.body.purchaseDate,
      paymentMethod: req.body.paymentMethod,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      status: "modified",
      };
      const response = await mongodb
        .getDb()
        .db()
        .collection('tickets')
        .replaceOne({ _id: userId }, ticket);
      console.log(response);
      if (response.modifiedCount > 0) {
        res.status(204).send();
      } else {
        res.status(500).json(response.error || 'Some error occurred while updating the ticket.');
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while updating the ticket.' });
  }
};

const deleteTicket = async (req, res) => {
//#swagger.tags=['Tickets']
  try {
    if (isInvalidObjectId(req.params.id)) {
      res.status(400).json('Invalid ID.');
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('tickets').remove({ _id: userId }, true);
    console.log(response);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the ticket.');
    }
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while deleting the ticket.' });
  }
};

module.exports = {
  getAll,
  getSingle,
  createTicket,
  updateTicket,
  deleteTicket
};
