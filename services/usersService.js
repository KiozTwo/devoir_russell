const bcrypt = require('bcryptjs');

let users = [];

// 🔥 création d’un user test au démarrage
(async () => {
    const hashedPassword = await bcrypt.hash('test123', 10);

    users.push({
        _id: "1",
        email: "capitaine@test.com",
        password: hashedPassword,
        role: "admin"
    });

    console.log("✅ USER TEST CREATED: capitaine@test.com / test123");
})();

module.exports = {
    getAll: async () => users,

    create: async (data) => {
        const user = {
            _id: Date.now().toString(),
            ...data
        };
        users.push(user);
        return user;
    },

    findByEmail: async (email) => {
        return users.find(u => u.email === email);
    }
};