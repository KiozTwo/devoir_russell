const User = require('../models/user');

// GET ALL USERS
exports.getAll = async () => {
    return await User.find().select('-password');
};

// CREATE USER
exports.create = async (data) => {
    return await User.create({
        username: data.username,
        email: data.email,
        password: data.password,
        role: data.role || 'user'
    });
};

// FIND BY EMAIL
exports.findByEmail = async (email) => {
    return await User.findOne({ email });
};

// FIND BY ID
exports.findById = async (id) => {
    return await User.findById(id).select('-password');
};

// UPDATE
exports.update = async (id, data) => {
    return await User.findByIdAndUpdate(
        id,
        {
            username: data.username,
            email: data.email,
            role: data.role
        },
        {
            new: true,
            runValidators: true
        }
    ).select('-password');
};

// DELETE
exports.delete = async (id) => {
    return await User.findByIdAndDelete(id);
};