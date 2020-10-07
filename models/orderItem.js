module.exports = function (sequelize, DataTypes) {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    notes: {
      type: DataTypes.TEXT
    },
    notesString: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    }
  });

  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order, {
      foreignKey: {
        allowNull: false
      }
    });

    OrderItem.belongsTo(models.Drink, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return OrderItem;
};
