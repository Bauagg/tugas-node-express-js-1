const router = require('express').Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const productControler = require('./controler');


router.get('/product', productControler.index);
router.get('/product/:id', productControler.viuws);
router.post('/product/', upload.single('image'), productControler.store);
router.put('/product/:id', upload.single('image'), productControler.update)
router.delete('/product/:id', upload.single('image'), productControler.deletet)


module.exports = router