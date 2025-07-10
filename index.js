// ECHO is on.
const express = require('express');
const logger = require('morgan');
const app = express();

const connectToMongoDB = require('./database/ConnectToMongoDB');

const PORT = 3010;

const dotenv = require("dotenv");
dotenv.config()

// MiddleWare
app.use(express.json());
app.use(logger('dev'));

// Routers
const categoryRouter = require('./routes/categoryRouter');
app.use('/api/category', categoryRouter)

const productRouter = require('./routes/productRouter');
app.use('/api/products', productRouter)

const customerRouter = require('./routes/customerRouter');
app.use('/api/customer', customerRouter)

const cartRouter = require('./routes/cartRouter');
app.use('/api/cart', cartRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
    connectToMongoDB();
})