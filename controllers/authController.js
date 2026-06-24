const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if (!user) {
            return res.status(401).json({
                message: 'Identifiants invalides'
            });
        }

        const isValid = await user.comparePassword(password);

        if (!isValid) {
            return res.status(401).json({
                message: 'Identifiants invalides'
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token
        });

    } catch (error) {
        res.status(500).json(error);
    }
};