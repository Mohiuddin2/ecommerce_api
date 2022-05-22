const express                         = require( 'express' );
const router                          = express.Router();
const { protect, admin }              = require( '../middleware/authMiddleware' );
const { 
    getProducts, 
    getProductById, 
    deleteProduct,
    updateProduct,
    createProduct,
    createProductReview,
    getTopProducts } = require( '../controllers/productController.js' );

router
    .route( '/' )
    .get( getProducts )
    .post( protect, admin, createProduct );

router
    .get( '/top', getTopProducts );
    
router
    .route( '/:id' )
    .get( getProductById )
    .delete( protect, admin, deleteProduct )
    .put( protect, admin, updateProduct );

router.route( '/:id/reviews' ).post( protect, createProductReview );


module.exports = router;