const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String, required: true },
    excerpt: { type: String },
    category: { type: [String] },
    images: { type: Array, default: "https://www.superherodb.com/pictures2/portraits/10/100/10255.jpg" },
    tags: { type: [String] },
    model: [{
        id: Number,
        size: { type: String },
        stock: { type: Number, required: true },
        price: { type: Number }
    }

    ],

}, {
    timestamps: true
})

const Product = mongoose.model('Product', userSchema)
module.exports = Product