const { Model, DataTypes } = require('sequelize');

class Financial extends Model {
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
      inflow: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      outflow: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      result: {
        type: DataTypes.DECIMAL(10, 2),
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
      modelName: 'Financial',
      tableName: 'financials',
      timestamps: true
    });
    return this;
  }
}

module.exports = Financial;
});

module.exports = Financial;
