const User = require('../models/user');

// GET ALL USERS
exports.getAll = async () => {
    return await User.find();
};

// CREATE USER
exports.create = async (data) => {
    return await User.create(data);
};

// FIND BY EMAIL
exports.findByEmail = async (email) => {
    return await User.findOne({ email });
};

// FIND BY ID
exports.findById = async (id) => {
    return await User.findById(id);
};

// UPDATE
exports.update = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

// DELETE
exports.delete = async (id) => {
    return await User.findByIdAndDelete(id);
};