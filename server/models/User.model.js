
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, required: true, },
  password: { type: String, required: true, },
  role: {
    type: String,
    default: 'client',
    enum: ['admin', 'client']
  },
  name: { type: String },
  lastName: { type: String },
  address1: { type: String },
  address2: String,
  zipCode: { type: String },
  city: { type: String },
  state: { type: String },
  country: String,
  phone: { type: Number },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User