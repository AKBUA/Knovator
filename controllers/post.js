const mongoose=require('mongoose');
const userModel=require('../models/user')
const postSchema=require('../models/post');

exports.post=async (req,res,next)=>{
    const {createdBy,body,title,active,geolocation}=req.body
   
   let  user
    const post=new postSchema(
      {

        createdBy:createdBy,
       body:body,
       title:title,
       active:active,
       geolocation:geolocation,
    
       }

    ) 
    post.save().then((data)=>{
        return userModel.findById(req.body.createdBy)

       
    }).then((userdata)=>{
            user=userdata;
            userdata.posts.push(post)
             userdata.save()
    }).then(result=>{
        res.send({
           post:post
        })
    }).catch((e)=>{
        console.log(e)
        res.send({e:e})
    })
    
}


exports.getpost=async(req,res)=>{

    const {id}=req.params
    await postSchema.findById({_id:id}).populate('createdBy','userName').then(result=>{
        res.status(200).send({post:result})
    }).catch((err)=>{
        res.status(500).send({error:err})
    });
     

}
exports.updatePost = async (req,res)=>{
   

    const {createdBy,body,title,active,geolocation}=req.body

      const updatedBook = await postSchema.findByIdAndUpdate(req.params.id,
        { $set: {  createdBy:createdBy, body:body, title:title, active:active, geolocation:geolocation} },
        { new: true }
      ).populate('createdBy','userName');
      res.status(200).json({updatedBook:updatedBook});
    
  }
  exports.deletePost = async (req,res,next)=>{
    const {id}=req.params
   
      await postSchema.findByIdAndDelete({_id:id})
      .then((result=>{
        res.status(200).json({
         
            message:"Post has been deleted."})
      })).catch((err)=>{
        res.status(500).send({error:err})
      })
      
    } 


    
  exports.countActive = async (req,res,next)=>{
   
   
    await postSchema.find({active:true}).populate('createdBy','userName')
    .then((result=>{
      res.status(200).json({
        post:result,

          message:"list of active user"
  })
    })).catch((err)=>{
      res.status(500).send({error:err})
    })


  }
    exports.countUnActive = async (req,res,next)=>{
   
   
        await postSchema.find({active:false}).populate('createdBy','userName')
        .then((result=>{
          res.status(200).json({
            post:result,
              message:"list of unactive user"
      })
        })).catch((err)=>{
          res.status(500).send({error:err})
        })
    }
  