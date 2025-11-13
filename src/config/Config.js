const mongoose=require('mongoose')

const uri= process.env.DATABASE_CONNECTION
mongoose.connect(uri)
.then(()=>{
    console.log("Database connection successfull");
})
.catch((error)=>{
    
    console.log("Error for connecting db",error);
})
