const ProductRepository = require('../repository/ProductRepository');
const ExpressError = require('../utils/ExpressError');


class ProductService {
    

    async findAllData(limit, offset) {
        try {
            return await ProductRepository.findAllData(limit, offset);
        } catch (error) {
            throw new Error(error);
        }
    }

    async findOne(id){
        
       try {
            const product = await ProductRepository.findOne(id);
            if (!product) {
                throw new ExpressError('Product not found', 404);
            }
            return product;
        }
        catch (error) {
            return null;
        }
        
    }

    async findBy(limit, offset, name) {
        return await ProductRepository.findBy(limit, offset, name);
    }

    async findByProductCode(product_code) {
        return await ProductRepository.findByProductCode(product_code);
    }

    async create(product) {
        return await ProductRepository.create(product);
    }
    async update(product, newProduct) {
    
        try {
           
            return await ProductRepository.update(product, newProduct);
        }
        catch (error) {
            console.error("Failed to update product: ", error);
        }
    }

    async updateDirect(product, data){
        return await ProductRepository.update(product, data);
    }

    async delete(id){

        try {
            
            const product = await this.findOne(id);
            if (!product) {
                throw new ExpressError('Product not found', 404);
            }
            console.log(product);
            return await ProductRepository.delete(product);
        } catch (error) {
            return null;
        }

    }

    async countData(){
        return await ProductRepository.countData();
    }

    async getTopProducts() {
        return await ProductRepository.getTopProducts();
    }

}

module.exports = new ProductService();