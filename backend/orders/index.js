const { db, requireLogin, requireAdmin, sendEmail, placedOrderEmail, confirmOrderEmail, deliverOrderEmail } = require('../shared');

function registerOrderRoutes(app) {
  app.post('/order/send', (req, res) => {
    const {
      cartProd, costProd, costLivr, nume,
      email, telefon, judet, localitate, adresa,
      codPostal, modalitate
    } = req.body;

    const userId = req.session.user?.id || 0;
    const totalPrice = costProd + costLivr;

    const insertOrderQuery = `
    INSERT INTO orders (userid, price, username, email, telefon, judet, oras, adresa, cod_postal, modalitate)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

    db.query(insertOrderQuery, [
      userId, totalPrice, nume, email, telefon,
      judet, localitate, adresa, codPostal, modalitate
    ], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: 'database error on order insert', status: 0 });
      }

      const getLastOrderQuery = `SELECT * FROM orders WHERE userid = ? ORDER BY id DESC LIMIT 1`;

      db.query(getLastOrderQuery, [userId], (err, result) => {
        if (err || result.length === 0) {
          return res.status(500).json({ message: 'database error on order fetch', status: 0 });
        }

        const orderId = result[0].id;

        let completed = 0;
        let hasError = false;

        if (cartProd.length === 0) {
          return res.status(200).json({ message: 'success (empty cart)', status: 1 });
        }

        cartProd.forEach((item) => {
          const insertItemQuery = `INSERT INTO order_items (productId,name, orderid, quantity, price) VALUES (?,?, ?, ?, ?)`;

          db.query(insertItemQuery, [item.product.id, item.product.name, orderId, item.quantity, Number(item.product.price)], (err) => {
            if (hasError) return;

            if (err) {
              hasError = true;
              console.log(err);
              return res.status(500).json({ message: 'database error on item insert', status: 0 });
            }

            completed++;

            if (completed === cartProd.length) {
              return res.status(200).json({ message: 'success', status: 1, orderId });
            }
          });
        });
      });
    });
  });

  app.post('/order/getConf', (req, res) => {
    const orderId = req.body.id;
    console.log(orderId, typeof (orderId));
    const query = 'SELECT * FROM orders WHERE id=?';
    db.query(query, [orderId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        console.log(result);
        const query1 = 'SELECT * FROM order_items WHERE orderid=?';
        db.query(query1, [orderId], (err, result1) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: 'database error', status: 0 });
          } else {
            const htmlContent = String(placedOrderEmail(result1, orderId, result[0].date, result[0].username, result[0].email, result[0].telefon, result[0].adresa, result[0].judet, result[0].localitate, result[0].price, 25, result[0].modalitate));
            sendEmail({
              to: result[0].email,
              subject: 'Comandă Plasată',
              text: null,
              html: htmlContent
            });
            res.status(200).json({ details: result[0], products: result1 });
          }
        });
      }
    });
  });

  app.get('/orders/show', requireLogin, (req, res) => {
    const userId = req.session.user.id;
    const query = 'SELECT * FROM orders WHERE userid=?';
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        console.log(result, 'mena');
        res.json(result);
      }
    });
  });

  app.post('/orders/changeStatus', requireLogin, requireAdmin, (req, res) => {
    const { id, status } = req.body;
    const query = 'UPDATE orders SET status=? WHERE id=?';
    db.query(query, [status, id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        const query1 = 'SELECT * FROM orders WHERE id=?';
        db.query(query1, [id], (err, result1) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: 'database error', status: 0 });
          } else {
            if (status === 'procesat') {
              const htmlContent = String(confirmOrderEmail(id, result1[0].date, result1[0].username, result1[0].email, result1[0].telefon, result1[0].adresa, result1[0].judet, result1[0].oras, result1[0].modalitate));
              sendEmail({ to: result1[0].email, subject: 'Comandă Confirmată', text: null, html: htmlContent });
            } else {
              if (status === 'livrare') {
                const htmlContent = String(deliverOrderEmail(id, result1[0].date, result1[0].username, result1[0].email, result1[0].telefon, result1[0].adresa, result1[0].judet, result1[0].oras, result1[0].modalitate, result1[0].price, 25));
                sendEmail({ to: result1[0].email, subject: 'Comandă pe Drum', text: null, html: htmlContent });
              }
            }
            res.json({ message: 'success', status: 1 });
          }
        });
      }
    });
  });

  // --- RUTA NOUĂ PENTRU ȘTERGEREA COMENZII ---
  app.delete('/order/delOrder/:id', requireLogin, (req, res) => {
    const orderId = req.params.id;
    const userId = req.session.user.id;

    // 1. Ștergem întâi produsele din comanda respectivă (pentru a evita erori de Foreign Key)
    const deleteItemsQuery = 'DELETE FROM order_items WHERE orderid = ?';
    db.query(deleteItemsQuery, [orderId], (err, itemsResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Eroare la ștergerea produselor din comandă', status: 0 });
      }

      // 2. Ștergem comanda în sine. Verificăm și userid pentru siguranță!
      const deleteOrderQuery = 'DELETE FROM orders WHERE id = ? AND userid = ?';
      db.query(deleteOrderQuery, [orderId, userId], (err, orderResult) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Eroare la ștergerea comenzii', status: 0 });
        }

        // Dacă nicio comandă nu a fost ștearsă (ex: ID invalid sau comanda aparține altcuiva)
        if (orderResult.affectedRows === 0) {
          return res.status(404).json({ message: 'Comanda nu a fost găsită sau nu îți aparține', status: 0 });
        }

        res.status(200).json({ message: 'Comanda a fost anulată cu succes', status: 1 });
      });
    });
  });

}

module.exports = { registerOrderRoutes };