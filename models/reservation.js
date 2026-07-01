const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
    clientName: {
        type: String,
        required: true
    },
    boatName: {
        type: String,
        required: true
    },
    catway: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Catway',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Reservation', ReservationSchema);