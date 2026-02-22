const { db, requireLogin } = require('../shared');

function registerCartRoutes(app) {
  app.get('/api/cart', requireLogin, (req, res) => {
    const userId = req.session.user.id;
    const query = 'SELECT * FROM cart_products WHERE userid=?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        const products = result;
        res.json({ cartProducts: products, status: 1 });
      }
    });
  });

  app.post('/api/addCart', requireLogin, (req, res) => {
    const userId = Number(req.session.user.id);
    const productId = Number(req.body.productId);
    const quantity = Number(req.body.quantity);
    const query = 'SELECT * FROM cart_products WHERE userid=? AND productid=?';

    db.query(query, [userId, productId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        console.log(result);
        if (result.length === 0) {
          console.log('prodNou');
          const query1 = 'INSERT INTO cart_products (userid,productid,quantity) VALUES (?,?,?)';
          db.query(query1, [userId, productId, quantity], (err, result) => {
            if (err) {
              console.log(err);
              res.status(500).json({ message: 'database error', status: 0 });
            } else {
              res.json({ message: 'Adăugat în coș!', status: 1 });
            }
          });
        } else {
          const qq = result[0].quantity + quantity;
          const query2 = 'UPDATE cart_products SET quantity=? WHERE userid=? AND productid=?';
          db.query(query2, [qq, userId, productId], (err, result) => {
            if (err) {
              res.status(500).json({ message: 'database error', status: 0 });
            } else {
              res.json({ message: 'Adăugat în coș!', status: 1 });
            }
          });
        }
      }
    });
  });

  app.post('/api/delCart', requireLogin, (req, res) => {
    const userId = req.session.user.id;
    const productId = req.body.productId;
    const query = 'DELETE FROM cart_products WHERE userid=? AND productid=?';
    db.query(query, [userId, productId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        res.json({ message: 'Șters din coș', status: 1 });
      }
    });
  });

  app.post('/api/cart/add', requireLogin, (req, res) => {
    const userId = req.session.user.id;
    const productId = req.body.productId;
    const query = 'SELECT * FROM cart_products WHERE userid=? AND productid=?';

    db.query(query, [userId, productId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Database error', status: 0 });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'Produsul nu există în coș', status: 0 });
      }

      const currentQty = result[0].quantity;
      const newQty = currentQty + 1;
      const updateQuery = 'UPDATE cart_products SET quantity=? WHERE userid=? AND productid=?';

      db.query(updateQuery, [newQty, userId, productId], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Database error', status: 0 });
        }
        res.json({ message: 'Cantitate crescuta', status: 1 });
      });
    });
  });

  app.post('/api/cart/subtract', requireLogin, (req, res) => {
    const userId = req.session.user.id;
    const productId = req.body.productId;
    const query = 'SELECT * FROM cart_products WHERE userid=? AND productid=?';

    db.query(query, [userId, productId], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'Database error', status: 0 });
      }

      if (result.length === 0) {
        return res.status(404).json({ message: 'Produsul nu există în coș', status: 0 });
      }

      const currentQty = result[0].quantity;

      if (currentQty <= 1) {
        return res.status(400).json({ message: 'Cantitatea nu poate fi mai mică de 1', status: 0 });
      }

      const newQty = currentQty - 1;
      const updateQuery = 'UPDATE cart_products SET quantity=? WHERE userid=? AND productid=?';

      db.query(updateQuery, [newQty, userId, productId], (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).json({ message: 'Database error', status: 0 });
        }
        res.json({ message: 'Cantitate scăzută', status: 1 });
      });
    });
  });
}

module.exports = { registerCartRoutes };
