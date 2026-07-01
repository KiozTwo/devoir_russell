const Catway = require('../models/catway');

module.exports = {
    getAll: async () => {
        return await Catway.find();
    },

    findById: async (id) => {
        return await Catway.findById(id);
    },

    create: async (data) => {
        return await Catway.create(data);
    },

    update: async (id, data) => {
        return await Catway.findByIdAndUpdate(id, data, { new: true });
    },

    delete: async (id) => {
        return await Catway.findByIdAndDelete(id);
    }
};