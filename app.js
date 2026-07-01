const express = require('express');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

// ======================
// IMPORT ROUTES
// ======================
const authRoutes = require('./routes/api/authRoutes');

const userApiRoutes = require('./routes/api/users');
const catwaysApiRoutes = require('./routes/api/catways');
const reservationApiRoutes = require('./routes/api/reservations');

const catwaysDashboardRoutes = require('./routes/dashboard/catways');
const reservationDashboardRoutes = require('./routes/dashboard/reservations');
const usersDashboardRoutes = require('./routes/dashboard/users');

const auth = require('./middleware/auth');
const reservationService = require('./services/reservationsService');

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

// IMPORTANT POUR RENDER
app.set('trust proxy', 1);

// ======================
// SESSION (PRODUCTION SAFE)
// ======================
app.use(session({
    secret: process.env.JWT_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    }
}));

// ======================
// STATIC FILES
// ======================
app.use(express.static(path.join(__dirname, 'public')));

// ======================
// DEBUG LOG
// ======================
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});

// ======================
// AUTH ROUTES
// ======================
app.use('/auth', authRoutes);

// HOME
app.get('/', (req, res) => {
    res.render('login');
});

// ======================
// DASHBOARD
// ======================
app.get('/dashboard', auth, async (req, res) => {
    try {
        const reservations = await reservationService.getAll();

        res.render('dashboard', {
            user: req.session.user,
            today: new Date(),
            reservations
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur dashboard");
    }
});

// ======================
// DASHBOARD MODULES
// ======================
app.use('/dashboard/users', auth, usersDashboardRoutes);
app.use('/dashboard/catways', auth, catwaysDashboardRoutes);
app.use('/dashboard/reservations', auth, reservationDashboardRoutes);

// ======================
// API (PROTÉGÉE)
// ======================
app.use('/api/users', auth, userApiRoutes);
app.use('/api/catways', auth, catwaysApiRoutes);
app.use('/api/reservations', auth, reservationApiRoutes);

// ======================
// SWAGGER
// ======================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ======================
// TEST ROUTE
// ======================
app.get('/test', (req, res) => {
    res.json({ message: "Server OK" });
});

// ======================
// 404
// ======================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route introuvable"
    });
});

module.exports = app;