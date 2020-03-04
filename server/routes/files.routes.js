const express = require('express');
const router = express.Router();

const uploader = require('../configs/cloudinary.config');

router.post('/upload', uploader.array("images"), (req, res, next) => {
    if (!req.files) {
        next(new Error('No file uploaded!'));
        return;
    }
    const uploadFiles = req.files.map(elm => elm.secure_url)
    res.json({ secure_url: uploadFiles });
})

module.exports = router;