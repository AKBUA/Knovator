const mongoose=require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const userSchema=require('../models/user');

exports.userSignup=async (req,res,next)=>{
    const {userName,email,password,role}=req.body
    if(!email){
        res.send('Email is required')
    }
    const salt = await bcrypt.genSalt(10)
    const bcryptedPassword=await bcrypt.hash(password,salt) 
    const user=new userSchema(
      {
        userName:userName,
        email:email,
        password:bcryptedPassword,
       
      }

    ) 
    user.save().then((data)=>{
        res.status(200).send({data:data})
    }).catch((e)=>{
        res.status(200).send({e:e})

    
    })
    

}

exports.login=async (req,res,next)=>{
    const {email,password}=req.body
    if(!email && !password){
        res.send('Email  or password missing ')
    }
    const userID= await userSchema.findOne({email})
    if(!userID){
        console.log('User does not exits .Please sign Up')
    } 
    if(userID.email && await  bcrypt.compare(password ,userID.password)){

     const token=jwt.sign({user:userID._id },'abhishek',{expiresIn:'24hours'})

     res.status(200).send({
        message:'User is logged in',
        data:userID._id,
        token:token
     })
    }
    else{
        res.send('email or password mismatched')
         }       

}






