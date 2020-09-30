module.exports = function (sequelize, DataTypes) {
  const Drink = sequelize.define('Drink', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    basePrice: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Drink.associate = function (models) {
    Drink.hasMany(models.OrderItem, {

    });
  };

  return Drink;
};
