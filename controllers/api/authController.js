exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "Validation error",
                errors: errors.array()
            });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await userService.createUser({
            email: req.body.email,
            password: hashedPassword
        });

        return res.status(201).json({
            message: "Utilisateur créé",
            user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};