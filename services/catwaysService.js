const Catway = require('../models/catway');

module.exports = {
    getAll: async () => {
        return await Catway.find();
    },

    findById: async (id) => {
        return await Catway.findById(id);
    },

    create: async (data) => {
        return await Catway.create({
            catwayNumber: data.catwayNumber,
            catwayType: data.catwayType,
            catwayState: data.catwayState
        });
    },

    update: async (id, data) => {
        return await Catway.findByIdAndUpdate(
            id,
            {
                catwayState: data.catwayState
            },
            {
                new: true,
                runValidators: true
            }
        );
    },

    delete: async (id) => {
        return await Catway.findByIdAndDelete(id);
    }
};