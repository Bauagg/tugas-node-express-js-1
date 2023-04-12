const router = require('express').Router();
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const fs = require("fs");
const path = require('path');


router.get("/", (req, res) => {
    // query string (localhost:3000/?page=...&total...)
    const { page, total } = req.query;
    res.send({
        status: "succesfully",
        message: "belajar node express",
        page,
        total
    })

})

// dinamic router
router.get("/produk/:id", (req, res) => {
    // res bebas bisa json, html, send
    res.json({
        id: req.params.id
    })
})

// membuat reques body dengan middleware
router.post("/produk/", upload.single('image'), (req, res) => {
    // membuat apload file
    const { name, price, stoks, status } = req.body
    const image = req.file
    if (image) {
        const target = path.join(__dirname, "uploads", image.originalname)
        fs.renameSync(image.path, target)
        res.json({
            name, price, stoks, status, image
        })

        //ini adalah cara untuk file donload =>res.sendFile(target)) 
    }
})

// dinamic route 2
router.get("/:category/:tag", (req, res) => {
    const { category, tag } = req.params;
    res.json({ category, tag })
})





module.exports = router;