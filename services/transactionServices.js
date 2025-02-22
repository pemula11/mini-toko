const SalesRepository = require('../repository/SalesRepository');
const ExpressError = require('../utils/ExpressError');


class TransactionService {
    

    async findAllData(limit, offset) {
        try {
            return await SalesRepository.findAllData(limit, offset);
        } catch (error) {
            throw new Error(error);
        }
    }

    async findOne(id){
        
        
        const sales = await SalesRepository.findOne(id);

        if (!sales) {
            throw new ExpressError('sales not found', 404);
        }
        return sales;
        
    }

    async findBy(limit, offset, name) {
        return await SalesRepository.findBy(limit, offset, name);
    }

    async findByProductCode(product_code) {
        return await SalesRepository.findByProductCode(product_code);
    }

    async create(transaction) {
        return await SalesRepository.create(transaction);
    }
    async update(transactionId, newTransaction) {
    
        
        const transaction = await this.findOne(transactionId);
        if (!transaction) {
            throw new ExpressError('transaction not found', 404);
        }
        return await SalesRepository.update(transaction, newTransaction);
    }

    async updateDirect(transaction, data){
        return await SalesRepository.update(transaction, data);
    }

    async delete(id){

    
        const transaction = await this.findOne(id);
        if (!transaction) {
            throw new ExpressError('transaction not found', 404);
        }
        return await SalesRepository.delete(transaction);

    }

    async countData(){
        return await SalesRepository.countData();
    }

    

}

module.exports = new TransactionService();