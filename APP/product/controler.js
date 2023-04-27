const connection = require('../../config/mysql')
const path = require('path')
const fs = require('fs')


const index = (req, res) => {
    const { name } = req.query
    let searct = {}
    if (name) {
        searct = {
            sql: 'SELECT * FROM product WHERE name LIKE ?',
            values: [`%${name}%`]
        }
    } else {
        searct = {
            sql: 'SELECT * FROM product'
        }
    }
    connection.query(searct, GetResponse(res))
}

const viuws = (req, res) => {
    connection.query({
        sql: 'SELECT * FROM product WHERE id = ?',
        values: [req.params.id]
    }, GetResponse(res))
}

const deletet = (req, res) => {
    connection.query({
        sql: 'DELETE FROM product WHERE id = ?',
        values: [req.params.id]
    }, GetResponse(res))
}

const store = (req, res) => {
    const { user_id, name, price, stock, status } = req.body
    const image = req.file;
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target);
        const url = `http://localhost:3000/publick/${image.originalname}`
        connection.query({
            sql: 'INSERT INTO product (user_id, name, price, stock, status, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            values: [user_id, name, price, stock, status, url]
        }, PostResponse(res));
    }
}

const update = (req, res) => {
    const { user_id, name, price, stock, status } = req.body
    const image = req.file;
    let sql = '';
    let values = []
    if (image) {
        const target = path.join(__dirname, '../../uploads', image.originalname)
        fs.renameSync(image.path, target)
        const url = `http://localhost:3000/publick/${image.originalname}`;
        sql = 'UPDATE product SET user_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url = ? WHERE id = ?';
        values = [user_id, name, price, stock, status, url, req.params.id]
    } else {
        sql = 'UPDATE product SET user_id = ?, name = ?, price = ?, stock = ?, status = ? WHERE id = ?';
        values = [user_id, name, price, stock, status, req.params.id]
    }
    connection.query({ sql, values }, PostResponse(res))
}

const GetResponse = (res) => {
    return (error, results) => {
        if (error) {
            res.status(500).send({
                status: 'failed',
                response: error
            })
        } else {
            res.send({
                status: 'success',
                response: results
            })
        }
    }
}

const PostResponse = (res) => {
    return (error, results) => {
        if (error) {
            res.status(500).send({
                status: 'failed',
                response: error
            })
        } else {
            res.status(201).send({
                status: 'success',
                response: results
            })
        }
    }
}

module.exports = {
    index,
    viuws,
    store,
    update,
    deletet
}




