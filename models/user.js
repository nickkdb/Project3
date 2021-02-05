const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {v4 : uuidv4} = require('uuid')

const userSchema = new Schema({
  displayName: { type: String, required: true, unique: true},
  email: { type: String, required: true, unique: true },
  products: [
    {
      uuid: { 
        type: String, 
        default: function genUUID() {
            return uuidv4()
        }
      },
      name: {
        type: String, 
        required: true
      },
      description: {
        type: String, 
        required: true
      },
      category: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      available: {
        type: Boolean,
        required: true,
        default: true
      },
      productDescription: {
        type: String,
        required: false
      },
      image: {
        type: String,
        required: false
      },
      tags: [],
      attributes: {}
    }
  ]
});

const User = mongoose.model("User", userSchema);

module.exports = User;
