module.exports = function (sequelize, DataTypes) {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  });

  Order.associate = function (models) {
    Order.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    Order.hasMany(models.OrderItem, {
      onDelete: 'cascade'
    });
  };

  return Order;
};
