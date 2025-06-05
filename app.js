const express = require('express');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');
const methodOverride = require('method-override');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine
app.set('view engine', 'ejs');

// Sessions & flash
app.use(session({
  secret: process.env.SESSION_SECRET || 'default_secret',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Initial log: BEFORE override
app.use((req, res, next) => {
  console.log('➡️ HTTP Method (before override):', req.method, '| Path:', req.path);
  next();
});

// Method override for PUT and DELETE
app.use(methodOverride('_method'));

// Secondary log: AFTER override
app.use((req, res, next) => {
  console.log('✅ After override:', req.method, '| Path:', req.path);
  next();
});

// Middleware to pass user ID to views
app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

// Routes
const indexRoutes = require('./routes/indexRoutes');
app.use('/', indexRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
