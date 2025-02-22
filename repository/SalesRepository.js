const {Sale} = require('../models');
const {Op} = require('sequelize');

class SalesRepository {
    async findAllData(limit = 10, offset= 0){
        try {
            return await Sale.findAll({
                limit: limit,
                offset: offset,
            include: ['product']
            });
        } catch (error) {
            console.error("Failed to fetch Sales: ", error);
            throw new Error("Failed to fetch Sales: ", error);
        }
    }

    async findOne(id){
       try {
            return  await Sales.findOne({
                where: {
                    id: id
                }
            });
       } catch (error) {
              throw new Error("Failed to fetch Sales: ", error);
       }
    }

    

    async create(sale){
        try {
            return await Sale.create(sale);
        } catch (error) {
            console.error("Failed to create Sale: ", error);
            throw new Error("Failed to create Sale: ", error);
        }
    }
    
    async update(sale, newsale){
        try {
            return await sale.update(newsale);
        } catch (error) {
            throw new Error("Failed to update product: ", error);
            
        }
    }

    async delete(sale){
        try {
            return await sale.destroy();
        } catch (error) {
          //  console.error("Failed to delete product: ", error);
            throw new Error("Failed to delete product: ", error);
        }
    }

    async countData(){
        try {
            return await Sales.count();
        } catch (error) {
            throw new Error("Failed to count product: ", error);
        }
    }

}

module.exports = new SalesRepository();