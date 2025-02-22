const productService = require('../services/productServices');
const transactionService = require('../services/transactionServices');
const validator = require('fastest-validator');
const v = new validator();

exports.index = async (req, res, next) => {
    const topProducts = await productService.getTopProducts();
    const recentProducts = await productService.findAllData(5, 0);
    
    res.render('dashboard/', {topProducts, recentProducts});
};

exports.showAllProducts = async (req, res, next) => {
    const products = await productService.findAllData();
    res.render('dashboard/product/index', {products});
}

exports.editProduct = async (req, res, next) => {
    const {id} = req.params;
    const product = await productService.findOne(id);
    if (!product) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }

    return res.render('dashboard/product/edit', {product});
}

exports.createProduct = async (req, res, next) => {
    const {product_name, price, stock, product_code} = req.body;

    

    // Check if product code already exists
    const existingProduct = await productService.findByProductCode(product_code);
    if (existingProduct) {
        return res.redirect('/admin/create-product');
    }

    const product = await productService.create({
        product_name,
        price,
        stock,
        product_code
    });

    return res.redirect('/admin/dashboard');

}

exports.editProduct = async (req, res, next) => {
    const {id} = req.params;
    const product = await productService.findOne(id);
    if (!product) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }

    return res.render('dashboard/product/edit', {product});
}


exports.updateProduct = async (req, res, next) => {
    const {id} = req.params;
    
    

    const product = await productService.update(id, req.body);

    if (!product) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }

    return res.redirect('/admin/products');
}

exports.deleteProduct = async (req, res, next) => {
    const {id} = req.params;
    
    const product = await productService.delete(id);

    return res.redirect('/admin/products');
}


exports.showAllTransactions = async (req, res, next) => {
    const transactions = await transactionService.findAllData();
  //  res.json(transactions);
    res.render('dashboard/transaction', {transactions});
}

exports.makeTransaction = async (req, res, next) => {
    const products = await productService.findAllData();

    res.render('dashboard/transaction/create', {products});
}

exports.createTransaction = async (req, res, next) => {
    const {product_code, quantity, price, subtotal} = req.body;

    const product = await productService.findByProductCode(product_code);
    if (!product) {
        return res.status(404).json({
            status: 'error',
            message: 'Product not found'
        });
    }


    if (!product.checkHasStock(quantity)) {
        return res.status(400).json({
            status: 'error',
            message: 'Insufficient stock'
        });
    }

    // Update product stock
    await product.reduceStock(quantity);

    
    const sales_date = new Date();
    const sales_referance = Math.floor(Math.random() * 100000000);

    const transaction = await transactionService.create({
        
        sales_referance,
        product_code,
        sales_date,
        quantity,
        price,
        subtotal
    });

   res.redirect('/admin/transaction');
}