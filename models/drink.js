module.exports = function (sequelize, DataTypes) {
  const Drink = sequelize.define('Drink', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT
    },
    basePrice: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    }
  });

  Drink.associate = function (models) {
    Drink.hasMany(models.OrderItem, {

    });
  };

  return Drink;
};
