module.exports = function (db) {
  return {
    // Get all drinks
    getDrinks: function (req, res) {
      db.Drink.findAll({}).then(function (dbDrinks) {
        res.json(dbDrinks);
      });
    },
    // Create a new order
    createOrder: function (req, res) {
      db.Order.create(req.body).then(function (dbOrder) {
        res.json(dbOrder);
      });
    },
    // Create a new order item
    createOrderItem: function (req, res) {
      // const orderItems = [];
      // for (let i = 0; i < req.body.length; i++) {
      //   db.OrderItem.create(req.body[i]).then(function (dbOrderItem) {
      //     orderItems.push(dbOrderItem);
      //   });
      // }
      // res.json(orderItems);
      db.OrderItem.bulkCreate(req.body).then(function (dbOrderItem) {
        res.json(dbOrderItem);
      });
    }
  };
};
