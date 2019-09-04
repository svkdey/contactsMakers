const mongoose=require('mongoose');
const config=require('config');
const db = config.get('mongoURI');
mongoose.set('useFindAndModify', false);
mongoose.set('useFindAndModify', false);
const connectDB=()=>{
    // console.log(db)
    mongoose.connect(db,{
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:true,
    }).then(()=>console.log("DB connected"))
    .catch(err=>{
        console.log(err)
    })
}

module.exports=connectDB;