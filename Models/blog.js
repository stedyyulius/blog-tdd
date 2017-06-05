const mongoose = require('mongoose')
const Schema = mongoose.Schema

var blogSchema = new Schema({
  title: String,
  blog: String,
  user_id: {type:Schema.Types.ObjectId,ref:'User'}
})

var blog = mongoose.model('Blogs',blogSchema)

module.exports = blog