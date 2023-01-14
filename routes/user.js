
const userController=require('../controllers/user')
const authRoutes=require('../middleware/user-auth')
const express = require('express');

const router=express.Router();


router.post('/userSignUp',userController.userSignup)

router.post('/userlogin',userController.login)
// router.get('/users/:username',authRoutes,userController.getUsers)
module.exports=router;