module.exports = function (db) {
  return {
    // Get all drinks
    getDrinks: function (req, res) {
      db.Drink.findAll({}).then(function (dbDrinks) {
        res.json(dbDrinks);
      });
    },
    // Get Orders & Order Items by Customer ID
    getCustOrders: function (req, res) {
      db.Order.findAll({
        where: { UserId: req.params.id },
        include: {
          model: db.OrderItem,
          include: db.Drink
        }
      }).then(function (dbOrders) {
        res.json(dbOrders);
      });
    },
    // // Get Order by Customer ID
    // getOrder: function (req, res) {
    //   db.Order.findAll({ where: { UserId: req.params.id } }).then(function (dbOrder) {
    //     res.json(dbOrder);
    //   });
    // },
    // // Get Order Item by Order ID
    // getOrderItem: function (req, res) {
    //   db.OrderItem.findAll({ where: { OrderId: req.params.id } }).then(function (dbOrderItem) {
    //     res.json(dbOrderItem);
    //   });
    // },
    // Create a new order
    createOrder: function (req, res) {
      db.Order.create({ UserId: req.params.id }).then(function (dbOrder) {
        res.json(dbOrder);
      });
    },
    // Create a new order item
    createOrderItem: function (req, res) {
      db.OrderItem.bulkCreate(req.body).then(function (dbOrderItem) {
        res.json(dbOrderItem);
      });
    }
  };
};
