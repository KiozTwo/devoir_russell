const express = require('express');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const catwaysRoutes = require('./routes/catways');
const reservationRoutes = require('./routes/reservations');

const Reservation = require('./models/reservation');
const auth = require('./middleware/auth');

const app = express();

// ======================
// VIEW ENGINE
// ======================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: process.env.JWT_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// ======================
// AUTH ROUTES
// ======================
app.use('/auth', authRoutes);

// ======================
// HOME
// ======================
app.get('/', (req, res) => {
    res.render('login');
});

// ======================
// DASHBOARD (FIX IMPORTANT)
// ======================
app.get('/dashboard', auth, async (req, res) => {
    try {
        const reservations = await Reservation.find().populate('catway');

        res.render('dashboard', {
            user: req.user,
            reservations: reservations || [],
            today: new Date()
        });

    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur serveur");
    }
});

// ======================
// FRONT ROUTES (CRUD VIEWS)
// ======================
app.use('/catways', auth, catwaysRoutes);
app.use('/users', auth, userRoutes);
app.use('/reservations', auth, reservationRoutes);

// ======================
// SWAGGER
// ======================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================
// EXPORT
// ======================
module.exports = app;