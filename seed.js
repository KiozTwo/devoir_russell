require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/user');

async function seed() {
    try {
        console.log("🔌 Connexion MongoDB...");

        console.log("MONGO_URI =", process.env.MONGO_URI);

        await mongoose.connect(process.env.MONGO_URI);

        console.log("✅ MongoDB connecté");
        console.log("📦 DB =", mongoose.connection.name);

        // Nettoyage
        const deleted = await User.deleteMany({});
        console.log("🧹 Users supprimés:", deleted.deletedCount);

        // Création user admin
        const user = await User.create({
            name: "capitaine",
            email: "capitaine@test.com",
            password: "test123",
            role: "admin"
        });

        console.log("👤 User créé :", user.email);

        // Vérification finale
        const count = await User.countDocuments();
        console.log("📊 Users en base:", count);

        process.exit();

    } catch (error) {
        console.error("❌ ERREUR SEED :", error);
        process.exit(1);
    }
}
console.log("MONGO URI =", process.env.MONGO_URI);
console.log("DB =", mongoose.connection.name);

seed();