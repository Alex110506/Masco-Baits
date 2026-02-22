const express = require('express');
const path = require('path');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const { registerAuthRoutes } = require('./auth');
const { registerProductRoutes } = require('./products');
const { registerCartRoutes } = require('./cart');
const { registerOrderRoutes } = require('./orders');
const { registerAdminRoutes } = require('./admin');

const app = express();

const frontendPath = path.join(__dirname, 'frontend', 'dist');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 1000 * 60 * 60,
  },
}));

app.use(express.static(frontendPath));

registerAuthRoutes(app);
registerProductRoutes(app);
registerCartRoutes(app);
registerOrderRoutes(app);
registerAdminRoutes(app);

app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

console.log('MySQL connected...');

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
