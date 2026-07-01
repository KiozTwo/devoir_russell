const Reservation = require('../models/reservation');

module.exports = {
    getAll: async () => {
        return await Reservation.find().populate('catway');
    },

    findById: async (id) => {
        return await Reservation.findById(id).populate('catway');
    },

    create: async (data) => {
        return await Reservation.create(data);
    },

    update: async (id, data) => {
        return await Reservation.findByIdAndUpdate(id, data, { new: true });
    },

    delete: async (id) => {
        return await Reservation.findByIdAndDelete(id);
    }
};