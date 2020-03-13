const mongoose = require('mongoose')
const Schema = mongoose.Schema

const invoicesSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    invoiceNumber: String,
    name: { type: String },
    lastName: { type: String },
    address1: { type: String },
    address2: String,
    zipCode: { type: String },
    city: { type: String },
    state: { type: String },
    country: String,
    phone: { type: Number },
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

}, {
    timestamps: true
})

const Invoice = mongoose.model('Invoice', invoicesSchema)
module.exports = Invoice
