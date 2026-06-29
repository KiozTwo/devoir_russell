const User = require('../models/user');

exports.createUser = (data) => User.create(data);

exports.findByEmail = (email) => User.findOne({ email });

exports.getAllUsers = () => User.find();

exports.getById = (id) => User.findById(id);