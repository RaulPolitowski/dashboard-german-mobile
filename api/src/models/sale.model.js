const { Model, DataTypes } = require('sequelize');

class Sale extends Model {
  static init(sequelize) {
    super.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  product: {
    type: DataTypes.STRING,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  unitPrice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  customer: {
    type: DataTypes.STRING,
    allowNull: false
  },
  salesperson: {
    type: DataTypes.STRING,
    allowNull: false
  },
  month: {
    type: DataTypes.STRING,
    allowNull: false
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
    }, {
      sequelize,
      modelName: 'Sale',
      tableName: 'sales',
      timestamps: true
    });
    return this;
  }
}

module.exports = Sale;
