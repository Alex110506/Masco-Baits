const { db, requireLogin, requireAdmin } = require('../shared');

function registerAdminRoutes(app) {
  app.post('/api/admin/recentOrders', requireLogin, requireAdmin, (req, res) => {
    const userId = req.session.user.id;
    const query = 'SELECT * FROM orders';
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'databse error', status: 0 });
      } else {
        res.json({ result: result, status: 1 });
      }
    });
  });

  app.post('/api/admin/getProducts', requireLogin, requireAdmin, (req, res) => {
    const { id } = req.body;
    const query = 'SELECT * FROM order_items WHERE orderid=?';
    db.query(query, [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'database error', status: 0 });
      } else {
        console.log(result);
        res.json({ result: result, status: 1 });
      }
    });
  });
}

module.exports = { registerAdminRoutes };
