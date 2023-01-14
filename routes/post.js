 const postController=require('../controllers/post')
const authRoutes=require('../middleware/user-auth')
const express = require('express');

const router=express.Router();


router.post('/post',authRoutes,postController.post)
router.get('/post/:id',authRoutes,postController.getpost)
router.put('/post/:id',authRoutes,postController.updatePost)
router.delete('/post/:id',authRoutes,postController.deletePost)
router.get('/active',postController.countActive)
router.get('/unactive',postController.countUnActive)







module.exports=router;