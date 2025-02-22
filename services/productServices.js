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
        
        
        const product = await ProductRepository.findOne(id);

        if (!product) {
            throw new ExpressError('Product not found', 404);
        }
        return product;
        
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
    async update(productId, newProduct) {
    
        
        const product = await this.findOne(productId);
        if (!product) {
            throw new ExpressError('Product not found', 404);
        }
        return await ProductRepository.update(product, newProduct);
    }

    async updateDirect(product, data){
        return await ProductRepository.update(product, data);
    }

    async delete(id){

    
        const product = await this.findOne(id);
        if (!product) {
            throw new ExpressError('Product not found', 404);
        }
        return await ProductRepository.delete(product);

    }

    async countData(){
        return await ProductRepository.countData();
    }

    async getTopProducts() {
        return await ProductRepository.getTopProducts();
    }

}

module.exports = new ProductService();