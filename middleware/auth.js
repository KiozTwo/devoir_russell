module.exports = (req, res, next) => {
    try {
        // Vérifie uniquement la session
        if (!req.session || !req.session.user) {
            return res.status(401).json({ message: "Non autorisé" });
        }

        // optionnel : injecte user dans req
        req.user = req.session.user;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Non autorisé" });
    }
};