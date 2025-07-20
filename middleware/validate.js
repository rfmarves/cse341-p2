const validator = require('../helpers/validate');

const saveEvent = (req, res, next) => {
    const validationRule = {
        eventName: 'required|string',
        eventDate: 'required|date',
        startTime: 'required|string',
        capacity: 'required|integer',
        location: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

const saveTicket = (req, res, next) => {
    const validationRule = {
        firstName: 'required|string',
        lastName: 'required|string',
        email: 'required|email',
        amountPaid: 'required|string',
        purchaseDate: 'required|date',
        paymentMethod: 'string',
        phoneNumber: 'required|string',
        address: 'string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412).send({
                success: false,
                message: 'Validation failed',
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveEvent,
    saveTicket
}