const bcrypt = require('bcryptjs');

let users = [];

// ======================
// USER TEST AUTO
// ======================
(async () => {
    const hashedPassword = await bcrypt.hash('test123', 10);

    users.push({
        _id: "1",
        name: "Capitaine",
        email: "capitaine@test.com",
        password: hashedPassword,
        role: "admin"
    });

    console.log("✅ USER TEST READY: capitaine@test.com / test123");
})();

module.exports = {
    getAll: async () => users,

    create: async (data) => {
        const user = {
            _id: Date.now().toString(),
            name: data.name || "No name",
            email: data.email,
            password: data.password || "",
            role: data.role || "user"
        };

        users.push(user);
        return user;
    },

    findByEmail: async (email) => {
        return users.find(u => u.email === email);
    }
};