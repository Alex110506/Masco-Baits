const { db, requireLogin } = require('../shared');

function registerProductRoutes(app) {
  app.get('/api/products', (req, res) => {
    const query = 'SELECT * FROM products';
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(result);
    });
  });

  app.post('/api/products/reviews', (req, res) => {
    const productId = Number(req.body.id);
    const query = 'SELECT * FROM productreviews WHERE productId=?';
    db.query(query, [productId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: 'database error' });
      }
      res.json(result);
    });
  });

  app.post('/api/products/postreview', requireLogin, (req, res) => {
    const comment = req.body.comment;
    const nrStars = req.body.nrStars;
    const productId = req.body.id;
    const query = 'INSERT INTO productreviews (productId,username,rating,comment) VALUES (?,?,?,?)';
    db.query(query, [productId, req.session.user.username, nrStars, comment], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        res.json({ message: 'Recenzie publicată', status: 1, username: req.session.user.username });
      }
    });
  });
}

module.exports = { registerProductRoutes };
