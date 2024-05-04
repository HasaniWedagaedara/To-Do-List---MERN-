const mongoose = require('mongoose')

const TodoShcema = new mongoose.Schema({
  task:String,
  done:{
    type:Boolean,
    default:false
  }
})

const TodoModel = mongoose.model("todos",TodoShcema)
module.exports=TodoModel