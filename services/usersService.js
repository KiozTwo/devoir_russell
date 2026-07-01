const User = require('../models/user'); // si tu as un model mongoose

module.exports = {
    getAll: async () => {
        return await User.find();
    },

    create: async (data) => {
        return await User.create(data);
    }
};