const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' })
const controler = require('./controler');

router.get('/product', controler.getProduct)
router.get('/product/:id', controler.getProductById)
router.post('/product/', upload.single('image'), controler.postProduct)
router.put('/product/:id', upload.single('image'), controler.putProduct)
router.delete('/product/:id', upload.single('image'), controler.deletetProduct)

module.exports = router