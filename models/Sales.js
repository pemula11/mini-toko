'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Sale extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        
       this.Product = this.belongsTo(models.Product, {
            foreignKey: 'product_code',
            as: 'product',
            targetKey: 'product_code',
            onDelete: 'CASCADE',

        });

       

    }
  }
  Sale.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sales_referance: {
        type: DataTypes.INTEGER,
        field: 'sales_referance',
        unique: true,
        allowNull: false
    },
    product_code: {
        type: DataTypes.INTEGER,
        field: 'product_code',
        allowNull: false
    },
    sales_date: {
        allowNull: false,
        field: 'sales_date',
        type: DataTypes.DATE
      },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    subtotal: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'sales',
    modelName: 'Sale',
    timestamps: false
  });
  return Sale;
};