const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// TEST ROUTE 👇
router.get('/test', (req, res) => {
    res.send("USERS ROUTER OK");
});

// LIST
router.get('/', auth, (req, res) => {
    res.render('users/list');
});

// NEW
router.get('/new', auth, (req, res) => {
    res.render('users/new');
});

// EDIT
router.get('/edit/:id', auth, (req, res) => {
    res.render('users/edit');
});

module.exports = router;