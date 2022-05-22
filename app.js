const path                       = require( 'path' );
const express                    = require( 'express' );
const dotenv                     = require( 'dotenv' );
const morgan                     = require( 'morgan' );
const connectDB                  = require( './config/db' );
const colors                     = require ( 'colors' );
const productRoutes              = require( './routes/productRoutes' );
const userRoutes                 = require( './routes/userRoutes' );
const orderRoutes                = require( './routes/orderRoutes' );
const uploadRoutes               = require( './routes/uploadRoutes' );
const { notFound, errorHandler } = require( './middleware/errorMiddleware' );

dotenv.config();

connectDB();

const app = express();

if ( process.env.NODE_ENV === 'development' ) {
    app.use( morgan( 'dev' ) );
}

app.use( express.json() );

app.use( '/api/products', productRoutes );
app.use( '/api/users', userRoutes );
app.use( '/api/orders', orderRoutes );
app.use( '/api/upload', uploadRoutes );

app.use( '/uploads', express.static( path.join( __dirname, '/uploads' ) ) );

// 404 route  
app.use( notFound ); 

// custom error handler 
app.use( errorHandler );

const PORT = process.env.PORT || 5000;

app.listen( PORT, console.log( `Server running in ${process.env.NODE_ENV} mode on port ${PORT}...`.yellow.bold ));