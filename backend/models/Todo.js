const mongoose = require('mongoose')

const TodoShcema = new mongoose.Schema({
  task:String
})

const TodoModel = mongoose.model("todos",TodoShcema)
module.exports=TodoModel