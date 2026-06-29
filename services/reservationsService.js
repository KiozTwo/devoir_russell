const Reservation = require('../models/reservation');

exports.getAll = () => Reservation.find();

exports.getById = (id) => Reservation.findById(id);

exports.create = (data) => Reservation.create(data);

exports.update = (id, data) =>
    Reservation.findByIdAndUpdate(id, data, { new: true });

exports.delete = (id) =>
    Reservation.findByIdAndDelete(id);