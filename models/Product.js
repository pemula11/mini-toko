'use strict';
const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }

    async checkHasStock(quantity) {
      if (this.stock < quantity) {
        return false;
      }
      return true;
    }
    async reduceStock(quantity) {
      if (this.checkHasStock(quantity)) {
        this.stock -= quantity;
        await this.save();
        return true;
      } else {
        return false;
      }
    }

  }
  Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_code: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
    },
    product_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Product',
    timestamps: false
  });
  return Product;
};