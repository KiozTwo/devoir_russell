exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("Email et mot de passe requis");
        }

        // 🔍 DEBUG IMPORTANT
        console.log("LOGIN ATTEMPT:", email);

        const user = await userService.findByEmail(email);

        console.log("USER FOUND:", user);

        if (!user) {
            return res.status(401).send("Utilisateur introuvable");
        }

        if (!user.password) {
            return res.status(500).send("Utilisateur sans mot de passe");
        }

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("PASSWORD MATCH:", isMatch);

        if (!isMatch) {
            return res.status(401).send("Mot de passe incorrect");
        }

        req.session.user = {
            id: user._id,
            email: user.email,
            role: user.role || 'user'
        };

        console.log("LOGIN SUCCESS:", req.session.user);

        return res.redirect('/dashboard');

    } catch (error) {
        console.error("🔥 LOGIN ERROR FULL STACK:", error);
        return res.status(500).send("Erreur serveur login");
    }
};