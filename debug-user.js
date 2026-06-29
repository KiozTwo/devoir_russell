require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

async function check() {
    await mongoose.connect(process.env.MONGO_URI);

    const users = await User.find();

    console.log("UTILISATEURS EN BASE :");
    console.log(users);

    process.exit();
}

check();