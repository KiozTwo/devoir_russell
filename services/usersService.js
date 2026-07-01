let users = [];

module.exports = {
    getAll: async () => {
        return users;
    },

    create: async (data) => {
        const newUser = {
            _id: Date.now().toString(),
            ...data
        };

        users.push(newUser);
        return newUser;
    }
};