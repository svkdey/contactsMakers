const app=require('express')();



app.use('/api/users',require('./serverroutes/user'))
app.use('/api/auth', require('./serverroutes/auth'))
app.use('/api/contacts', require('./serverroutes/contact'))



app.get('/',(req,res)=>{
    return res.status(200).json({msg:"welcome"});
})








const PORT=process.env.PORT||6000;
app.listen(PORT,()=>{
    console.log("connected to :", PORT)
})