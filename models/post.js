const mongoose=require('mongoose')
const geocoder=require('../utils/geocoder')

const Schema=mongoose.Schema
const postSchema= new Schema({

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    title:{
        type:String,
        required:true,
      
        
    },

    body:{
        type:String,
        required:true,
     
        
    },
    active:{
        required:true,
        type:Boolean
    },
    geolocation:{
        type:String,
        
    },
   location:{
    type:{
        type:String,
        enum:['Point']
    
    
    },
    coordinates: {
        type:[Number],
        index:'2dsphere'
    },

   }


},
{ timestamps: true }


)

postSchema.pre('save',async function(next){

const loc=await geocoder.geocode(this.geolocation)

console.log(loc)

})



module.exports=mongoose.model('post',postSchema)