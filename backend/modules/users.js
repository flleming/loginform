const mongoose=require('mongoose')

const Schema=mongoose.Schema

const user=new Schema({
    login:{
        type:String,
        unique:true,
        reqquire:true,
        trim:true,
        minlength:3},
    password:{
        type:String,

        trim:true,
        minlength:1
    },
    image:{
        type:String,
    
        trim:true
        },
    username:{
        type:String,
        trim:true,
        minlength:3,
    }
}, { strict: false })
const User=mongoose.model('users',user)

module.exports=User