const Reservation = require('../models/reservation');

module.exports = {
    getAll: async () => {
        return await Reservation.find().populate('catway');
    },

    findById: async (id) => {
        return await Reservation.findById(id).populate('catway');
    },

    create: async (data) => {
        return await Reservation.create({
            clientName: data.clientName,
            boatName: data.boatName,
            catway: data.catway,
            startDate: data.startDate,
            endDate: data.endDate
        });
    },

    update: async (id, data) => {
        return await Reservation.findByIdAndUpdate(
            id,
            {
                clientName: data.clientName,
                boatName: data.boatName,
                catway: data.catway,
                startDate: data.startDate,
                endDate: data.endDate
            },
            {
                new: true,
                runValidators: true
            }
        );
    },

    delete: async (id) => {
        return await Reservation.findByIdAndDelete(id);
    }
};