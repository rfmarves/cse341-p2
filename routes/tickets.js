const express = require('express');
const router = express.Router();

const ticketsController = require('../controllers/tickets');
const validation = require('../middleware/validate');

router.get('/', ticketsController.getAll);

router.get('/:id', ticketsController.getSingle);

router.post('/', validation.saveTicket, ticketsController.createTicket);

router.put('/:id', validation.saveTicket, ticketsController.updateTicket);

router.delete('/:id', ticketsController.deleteTicket);

module.exports = router;
