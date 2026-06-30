const Catway = require('../models/catway');

exports.getAllCatways = () => Catway.find();

exports.getCatwayById = (id) => Catway.findById(id);

exports.createCatway = (data) => Catway.create(data);

exports.updateCatway = (id, data) =>
    Catway.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });

exports.deleteCatway = (id) =>
    Catway.findByIdAndDelete(id);