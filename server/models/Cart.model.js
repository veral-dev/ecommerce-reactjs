
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({

    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, },
        model: { type: Schema.Types.ObjectId, ref: "Product.model", required: true, },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true }
    }],
    total: { type: Number, default: 0 },

}, {
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
