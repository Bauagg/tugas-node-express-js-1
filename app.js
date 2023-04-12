const express = require("express")
const app = express();
const router = require("./routes")
const log = require("./middlewares/logger")

// file utama
app.use(log)
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

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
