const mongoose=require('mongoose')
 const validator=require('node-mongoose-validator')
const Schema=mongoose.Schema
const userSchema= new Schema({

    userName:{
        type:String,
        required:true,
        unique:true,
        minlength:4,
        
    },

    email:{
        type:String,
        required:true,
        unique: true,
     validate: validator.$isEmail()
        
    },
    password:{
        type:String,
        required:true,
        
        minlength:5,
    },
    posts:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"post",

    }]
  


})

module.exports=mongoose.model('user',userSchema)