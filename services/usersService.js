let users = [];

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