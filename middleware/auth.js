module.exports = (req, res, next) => {
    try {
        if (!req.session || !req.session.user) {
            return res.redirect('/auth/login');
        }

        req.user = req.session.user;
        next();

    } catch (error) {
        console.error("Auth middleware error:", error);
        return res.status(500).send("Erreur d'authentification");
    }
};