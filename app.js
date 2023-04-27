const express = require("express")
const path = require('path')
const app = express();
const productRouter = require("./APP/product/routes")
const productRouterV2 = require('./APP/product-v2/routes')
const logger = require('morgan')

// file utama
app.use(logger('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/publick', express.static(path.join(__dirname, 'uploads')))
app.use('/api/v1', productRouter)
app.use('/api/v2', productRouterV2)

// membuat error
app.use((req, res, next) => {
    res.status(404)
    res.send({
        status: "failed",
        message: "Resourse " + req.originalUrl + " Not Found"
    })
})

// lokal hos / serve
app.listen(3000, () => console.log('Server is running on PORT start'))
