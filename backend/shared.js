const path = require('path');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');
const fs = require('fs');
require('dotenv').config();

const placedOrderEmail = require('./assets/placed-email');
const confirmOrderEmail = require('./assets/confirm-email');
const deliverOrderEmail = require('./assets/delivery-email');

const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  multipleStatements: true,
});

function requireLogin(req, res, next) {
  if (!req.session.user) return res.status(401).json({ message: 'Aveți nevoie de un cont', status: 0 });
  next();
}

function requireAdmin(req, res, next) {
  if (req.session.user.role === 'user') return res.status(403).json({ message: "You don't have admin permissions", status: 0 });
  next();
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  handler: (req, res) => {
    return res.status(429).json({
      message: 'Ai încercat de prea multe ori. Te rog așteaptă 15 minute.',
      status: 0,
    });
  },
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function sendEmail({ to, subject, text, html }) {
  const mailOptions = {
    from: `"Masco-Baits" <${process.env.EMAIL_USERNAME}>`,
    to,
    subject,
    text,
    html,
  };
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

const emailText = fs.readFileSync(path.join(__dirname, 'assets', 'welcome-text.txt'), 'utf-8');
const emailContent = fs.readFileSync(path.join(__dirname, 'assets', 'welcome-email.html'), 'utf-8');

module.exports = {
  db,
  requireLogin,
  requireAdmin,
  loginLimiter,
  sendEmail,
  emailText,
  emailContent,
  placedOrderEmail,
  confirmOrderEmail,
  deliverOrderEmail,
};
