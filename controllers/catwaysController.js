const Catway = require('../models/catway');

// FRONT
exports.getCatwaysPage = async (req, res) => {
    const catways = await Catway.find();
    res.render('catways/index', { catways });
};

exports.createPage = (req, res) => {
    res.render('catways/create');
};

exports.editPage = async (req, res) => {
    const catway = await Catway.findById(req.params.id);
    res.render('catways/edit', { catway });
};

// CRUD
exports.createCatway = async (req, res) => {
    await Catway.create(req.body);
    res.redirect('/catways');
};

exports.updateCatway = async (req, res) => {
    await Catway.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/catways');
};

exports.deleteCatway = async (req, res) => {
    await Catway.findByIdAndDelete(req.params.id);
    res.redirect('/catways');
};

// API
exports.getCatways = async (req, res) => {
    const data = await Catway.find();
    res.json(data);
};

exports.getCatwayById = async (req, res) => {
    const data = await Catway.findById(req.params.id);
    res.json(data);
};