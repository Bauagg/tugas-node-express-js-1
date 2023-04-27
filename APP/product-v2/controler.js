const product = require('./model');
const path = require('path');
const fs = require('fs');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const postProduct = async (req, res) => {
    const { user_id, name, price, stock, status } = req.body;
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target);
        const url = `http://localhost:3000/publick/${image.originalname}`;
        try {
            const produk = await product.create({
                user_id,
                name,
                price,
                stock,
                status,
                image_url: url
            });
            res.status(201).send(produk);
        } catch (err) {
            console.error(err);
            res.status(500).send({ message: 'Terjadi kesalahan saat menambahkan produk.' });
        }
        // try {
        //     await product.sync()
        //     const result = await product.create({ user_id, name, price, stock, status, image_url: url })
        //     res.send(result)
        // } catch (e) {
        //     res.send(e)
        // }
    }
}

const getProduct = async (req, res) => {
    const { nama } = req.query
    let where = {}
    try {
        if (nama) {
            where = {
                name: { [Op.like]: `%${nama}%` }
            }
        }
        const produk = await product.findAll({ where })
        res.status(200).send(produk)
    } catch (error) {
        console.log(error)
        res.status(500).send('Terjadi kesalahan saat mengambil data produk.')
    }
}

const getProductById = async (req, res) => {
    const { id } = req.params
    try {
        const produk = await product.findByPk(id)
        if (!produk) {
            return res.status(400).send({ message: 'Product not found' })
        }
        res.send(produk)
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error' })
    }
}

const deletetProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const produk = await product.findByPk(id)
        if (!produk) {
            return res.status(401).send('Produk tidak ditemukan.')
        }
        await produk.destroy();
        res.send('Produk berhasil dihapus.')
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Internal server error' })
    }
}

const putProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { user_id, name, price, stock, status } = req.body;
        const produk = await product.findByPk(id);
        if (!produk) {
            res.status(404).send('Produk tidak ditemukan.')
        }
        let image = req.file;
        if (image) {
            const target = path.join(__dirname, '../../uploads', image.originalname)
            fs.renameSync(image.path, target)
            const url = `http://localhost:3000/publick/${image.originalname}`;
            await produk.update({
                user_id,
                name,
                price,
                stock,
                status,
                image_url: url
            })
        } else {
            await produk.update({
                user_id,
                name,
                price,
                stock,
                status
            })
        }
        res.send(produk)
    } catch (error) {
        console.log(error)
        res.status(500).send('Terjadi kesalahan saat memperbarui produk.')
    }
}


module.exports = {
    getProduct,
    getProductById,
    postProduct,
    deletetProduct,
    putProduct
}

