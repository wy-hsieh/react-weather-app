const mongoose = require('mongoose')

const applySchema = new mongoose.Schema({
  name: {
    type: String
  },
  phone: {
    type: String
  },
  email: {
    type: String
  },
  degree: {
    type: String
  },
  school: {
    type: String
  },
  department: {
    type: String
  },
  grade: {
    type: String
  },
  customField: {
    type: String
  },
  graduateDate: {
    type: String
  },
  choice1: {
    type: String
  },
  choice2: {
    type: String
  },
  choice3: {
    type: String
  },
  choice4: {
    type: String
  },
  choice5: {
    type: String
  },
  choice6: {
    type: String
  },
  message: {
    type: String
  },
  know: {
    type: Array
  },
  otherSelect: {
    type: String
  },
  time: {
    type: String
  },
  recaptcha: Boolean
})

const Apply = mongoose.model('Apply', applySchema)
module.exports = Apply


