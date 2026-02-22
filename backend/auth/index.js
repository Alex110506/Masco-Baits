const bcrypt = require('bcryptjs');
const { db, requireLogin, loginLimiter, sendEmail, emailText, emailContent } = require('../shared');

function registerAuthRoutes(app) {
  app.post('/register', loginLimiter, (req, res) => {
    const { username, password, email, tel, judet, oras, adress, postalcode } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        res.status(500).json({ message: 'Eroare baza de date!', status: 0 });
      } else {
        const query = 'INSERT INTO users (username,email,password,telefon,judet,oras,adresa,cod_postal) VALUES (?,?,?,?,?,?,?,?)';
        db.query(query, [username, email, hash, tel, judet, oras, adress, postalcode], (err, result) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: 'Email-ul este deja folosit!', status: 0 });
          } else {
            const query = 'SELECT * FROM users WHERE email=?';
            db.query(query, [email], (err, result) => {
              if (err) {
                console.log(err);
                res.status(500).json({ message: 'Eroare baza de date!', status: 0 });
              } else {
                req.session.user = { id: result[0].id, username: username };
                sendEmail({
                  to: email,
                  subject: 'Bine ai venit la Masco-Baits',
                  text: emailText,
                  html: emailContent,
                });
                res.json({ message: 'Cont creat cu succes!', status: 1 });
              }
            });
          }
        });
      }
    });
  });

  app.post('/login', loginLimiter, (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const query = 'SELECT * FROM users WHERE email=?';
    db.query(query, [email], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        if (result.length > 0) {
          bcrypt.compare(password, result[0].password, (err, match) => {
            if (match) {
              req.session.user = { id: result[0].id, username: result[0].username, role: result[0].rol };
              res.json({ message: 'Logat cu succes!', status: 1 });
            } else {
              res.status(401).json({ message: 'Email/Parolă incorecte', status: 1 });
            }
          });
        } else {
          res.status(401).json({ message: 'Email/Parolă incorecte', status: 0 });
        }
      }
    });
  });

  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.json({ message: 'logged out' });
    });
  });

  app.get('/user/data', requireLogin, (req, res) => {
    const userId = req.session.user.id;
    const query = 'SELECT * FROM users WHERE id=?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'databse error', status: 0 });
      } else {
        console.log(result);
        res.json(result);
      }
    });
  });

  app.post('/user/adressChange', requireLogin, (req, res) => {
    const userId = req.session.user.id;
    const { judet, oras, adress, postalcode } = req.body;
    const query = 'UPDATE users SET judet=?, oras=?, adresa=?, cod_postal=? WHERE id=?';
    db.query(query, [judet, oras, adress, postalcode, userId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        res.json({ message: 'adress updated', status: 1 });
      }
    });
  });

  app.post('/auth/check', (req, res) => {
    if (req.session.user) {
      const userId = req.session.user.id;
      const query = 'SELECT username,rol,email,telefon,judet,oras,adresa,cod_postal FROM users WHERE id=?';
      db.query(query, [userId], (err, result) => {
        if (err) {
          res.status(500).json({ loggedIn: true, err });
        } else {
          res.status(200).json({ loggedIn: true, user: result[0] });
        }
      });
    } else {
      res.status(401).json({ loggedIn: false });
    }
  });
}

module.exports = { registerAuthRoutes };
