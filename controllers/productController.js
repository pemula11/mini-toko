const productService = require('../services/productServices');
const validator = require('fastest-validator');
const v = new validator();
const {Op} = require('sequelize');

module.exports.getProducts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;
    const products = await productService.findAllData(limit, startIndex);
    const total = await productService.countData();
    const result = {
        data: products,
        page: page,
        limit: limit,
        total: total,
        pages: Math.ceil(total / limit),
    }

    res.json({
        status: 'success',
        data: result
    });
}

module.exports.getProduct = async (req, res, next) => {
    const {id} = req.params;

    const product = await productService.findOne(id);
    if (!product) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }

    return res.json({
        status: 'success',
        data: product
    });
}

module.exports.getProductsBy = async (req, res, next) => {
    const name = req.query.name || '';
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const startIndex = (page - 1) * limit;

    
    const products = await productService.findBy(limit, startIndex, name);
    if (!products.length) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }
    const total = await productService.countData();
    const result = {
        data: products,
        page: page,
        limit: limit,
        total: total,
        pages: Math.ceil(total / limit),
    }

    return res.json({
        status: 'success',
        data: result
    });
}



module.exports.addProduct = async (req, res, next) => {

    const schema = {
        product_name: 'string|empty:false',
        product_code: 'number|empty:false|unique:products.product_code',
        price: 'number|empty:false|default:0|min:1',
        stock: 'number|default:0',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const {product_name, price, stock, product_code} = req.body;

     // Check if product code already exists
     const existingProduct = await productService.findByProductCode(product_code);
     if (existingProduct) {
         return res.status(400).json({
             status: 'error',
             message: 'Product code already exists'
         });
     }

    const product = await productService.create({
        product_name,
        price,
        stock,
        product_code
    });

    return res.json({
        status: 'success',
        data: product
    })

}

module.exports.updateProduct = async (req, res, next) => {
    const {id} = req.params;
    
    
    const schema = {
        name: 'string|optional',
        price: 'number|min:1|optional',
        stock: 'number|min:0|optional',
        description: 'string|optional',
        category: 'string|optional'
    }

    const validate = v.validate(req.body, schema);
    if (validate.length) {
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const product = await productService.update(id, req.body);

    return res.json({
        status: 'success',
        data: product
    });
}

module.exports.deleteProduct = async (req, res, next) => {
    const {id} = req.params;
    const product = await productService.delete(id);
    return res.json({
        status: 'success',
        message: 'product deleted'
      })

}

