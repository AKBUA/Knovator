const express = require('express')
const app = express()
const mongoose=require('mongoose')
const userRoutes=require('./routes/user')
const postRoutes=require('./routes/post')
app.use(express.json());
 app.use(userRoutes)
app.use(postRoutes)
app.get('/', (req, res) => {
  res.send('Hello World!')
})
mongoose.connect('mongodb://localhost:27017/knovator',{
  useNewUrlParser: true,
   useUnifiedTopology: true
},()=>{
  console.log('db connected')
})
app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})