
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: { type: String, required: true, },
  password: { type: String, required: true, },
  role: {
    type: String,
    enum: ['admin', 'client']
  },
  name: { type: String },
  lastName: { type: String },
  street: { type: String },
  zipCode: { type: String },
  city: { type: String },
  state: { type: String },
  phone: { type: Number },
  wishlist: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  orders: Array,
}, {
  timestamps: true
})

const User = mongoose.model('User', userSchema)
module.exports = User