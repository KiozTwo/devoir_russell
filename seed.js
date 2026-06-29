require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connecté");

        // Supprime ancien user test
        await User.deleteMany({});

        // Crée utilisateur admin
        const user = await User.create({
            name: "capitaine",
            email: "capitaine@test.com",
            password: "test123",
            role: "admin"
        });

        console.log("✅ User créé :", user.email);

        process.exit();

    } catch (error) {
        console.error("Erreur seed :", error);
        process.exit(1);
    }
}

seed();