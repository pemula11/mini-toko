const express = require('express');
const dashboardController = require('../../controllers/dashboardController');
const warpAsync = require('../../utils/wrapAsync');

const router = express.Router();


// Admin dashboard route
router.get('/', warpAsync(dashboardController.index));
router.get('/products', warpAsync(dashboardController.showAllProducts));
router.get('/create-product', (req, res) => {
    res.render('dashboard/product/create');
});

router.get('/product/edit/:id', warpAsync(dashboardController.editProduct));
router.post('/create-product', warpAsync(dashboardController.createProduct));
router.put('/edit-product/:id', warpAsync(dashboardController.updateProduct));
router.delete('/product/:id', warpAsync(dashboardController.deleteProduct));


router.get('/transaction', warpAsync(dashboardController.showAllTransactions));
router.get('/create-transaction', warpAsync(dashboardController.makeTransaction));
router.post('/transaction', warpAsync(dashboardController.createTransaction));


module.exports = router;