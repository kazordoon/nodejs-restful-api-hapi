const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

UserSchema.pre('save', async function (next) {
  const hashPassword = await bcrypt.hash(this.password, 10)
  this.password = hashPassword
  next()
})

module.exports = mongoose.model('User', UserSchema)
