const express = require('express');
const mongoose = require('mongoose');
const app = express();

const cors = require('cors');
app.use(cors());


// Middleware xử lý JSON
app.use(express.json());
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Schema và Model cho Product
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true }
});

const ProductModel = mongoose.model('Product', productSchema);

// Route chính
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Lấy danh sách sản phẩm
app.get('/api/v1/products', async (req, res) => {
    try {
        const products = await ProductModel.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Tạo sản phẩm mới
app.post('/api/v1/products', async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        const product = await newProduct.save();
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Khởi động server
app.listen(8000, () => {
    console.log(`Server is running  port 8000`);
});
