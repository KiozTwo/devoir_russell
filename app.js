const express = require('express');
const session = require('express-session');
const path = require('path');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const catwayRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');

const auth = require('./middleware/auth');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

app.get('/dashboard', auth, (req, res) => {
    res.render('dashboard', {
        user: req.session.user
    });
    
});
app.get('/ping', (req, res) => {
    res.send('API OK');
});

app.use('/users', auth, userRoutes);
app.use('/catways', auth, catwayRoutes);
app.use('/reservations', auth, reservationRoutes);

module.exports = app;