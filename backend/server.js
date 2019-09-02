const express= require('express')
const cors =require('cors');
const mongoose=require('mongoose');
// const config=require('config')



// const db=config.get("mongoURI")
const app=express()
const port =process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/app1",{useNewUrlParser:true,useCreateIndex:true})

const connection=mongoose.connection
connection.once('open',()=>{
    console.log("Mongodb database connection successfully")
})
const users=require('./route/usersroute')
app.use('/users',users)
app.use('/upload',express.static('upload'))


app.listen(port ,()=>{
    console.log(`server is runing on port ${port}`)
 })
