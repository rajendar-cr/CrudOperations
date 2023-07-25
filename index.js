const express=require('express');
const app=express();
const cors=require('cors')
app.use(cors());
app.use(express.json());
const DB_URL=process.env.DB_URL
const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:String,
    email:String,
    mobile:String
})
const userModel=mongoose.model('Users',userSchema)

const port=process.env.PORT || 8080
app.get('/',async(req,res)=>{
    const data=await userModel.find({})
    res.json({message:'data retrived successfully', data:data,success:true})
})
app.post('/create',async(req,res)=>{
    const user=req.body
    const data=await userModel.create(user)
   
    res.send({message:'data saved successfully',success:true, data:data})
})
app.put('/update',async(req,res)=>{
    const {_id,...rest}=req.body
    const data=await userModel.updateOne({_id:_id},rest)
    res.send({message:'data updated successfully',success:true, data:data})
})
app.delete('/delete/:id',async(req,res)=>{
    const id=req.params.id;
    const data=await userModel.deleteOne({_id:id})
    console.log(data)
    res.send({message:'data deleted successfully',success:true, data:data})
})

mongoose.connect(DB_URL,{
    useNewUrlParser:true,useUnifiedTopology:true
})
.then(()=>{
    console.log('connected');   
})
.catch(()=>{
    console.log('error')
});
app.listen(port,()=>{
    console.log("port running on 8080")
})