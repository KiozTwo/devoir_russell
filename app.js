const express = require('express');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

// ======================
// ROUTES
// ======================
const authRoutes = require('./routes/api/authRoutes');

const userApiRoutes = require('./routes/api/users');
const catwaysApiRoutes = require('./routes/api/catways');
const reservationApiRoutes = require('./routes/api/reservations');

const catwaysDashboardRoutes = require('./routes/dashboard/catways');
const reservationDashboardRoutes = require('./routes/dashboard/reservations');
const usersDashboardRoutes = require('./routes/dashboard/users');

const auth = require('./middleware/auth');

const app = express();

// ======================
// DEBUG MIDDLEWARE
// ======================
app.use((req, res, next) => {
    console.log(`➡️ ${req.method} ${req.url}`);
    next();
});

// ======================
// VIEW ENGINE
// ======================
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ======================
// GLOBAL MIDDLEWARES
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// ⚠️ SESSION (OK pour dashboard, pas obligatoire pour API)
app.use(session({
    secret: process.env.JWT_SECRET || 'secret',
    resave: false,
    saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, 'public')));

// ======================
// AUTH ROUTES (API)
// ======================
// ✔️ CORRIGÉ : standard API REST
app.use('/api/auth', authRoutes);

// ======================
// HOME
// ======================
app.get('/', (req, res) => {
    res.render('login');
});

// ======================
// DASHBOARD (FRONT - PROTÉGÉ)
// ======================
app.use('/dashboard/catways', auth, catwaysDashboardRoutes);
app.use('/dashboard/reservations', auth, reservationDashboardRoutes);
app.use('/dashboard/users', auth, usersDashboardRoutes);

// ======================
// API (PROTÉGÉES)
// ======================
app.use('/api/users', auth, userApiRoutes);
app.use('/api/catways', auth, catwaysApiRoutes);
app.use('/api/reservations', auth, reservationApiRoutes);

// ======================
// SWAGGER
// ======================
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "API Russell Marina",
    customCss: '.swagger-ui .topbar { display: none }'
}));

// DASHBOARD HOME
app.get('/dashboard', auth, async (req, res) => {
    try {
        const reservationService = require('./services/reservationService');

        const reservations = await reservationService.getAll();

        res.render('dashboard', {
            user: req.session.user,
            today: new Date(),
            reservations
        });

    } catch (error) {
        res.status(500).send("Erreur dashboard");
    }
});
// ======================
// TEST ROUTES
// ======================
app.get('/test', (req, res) => {
    res.json({ message: "Server OK" });
});

app.get('/debug', (req, res) => {
    res.send("Dashboard OK");
});

// ======================
// 404 HANDLER
// ======================
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route introuvable"
    });
});

// ======================
// EXPORT
// ======================
module.exports = app;