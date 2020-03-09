
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({

    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product', required: true, },
        model: { type: Schema.Types.ObjectId, ref: "Product.model", required: true, },
        productName: { type: String },
        modelSize: { type: String },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        subtotal: { type: Number },
    }],
    total: { type: Number, default: 0 },
    cartIconQuantity: { type: Number },
}, {
    timestamps: true
})

const Cart = mongoose.model('Cart', cartSchema)
module.exports = Cart
