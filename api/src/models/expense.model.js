const { Model, DataTypes } = require('sequelize');

class Expense extends Model {
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
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  paymentMethod: {
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
      modelName: 'Expense',
      tableName: 'expenses',
      timestamps: true
    });
    return this;
  }
}

module.exports = Expense;
