const mongoose= require("mongoose");
const moviesDB= "moviesDB";

mongoose.connect(`mongodb://localhost/${moviesDB}`, {useNewUrlParser:true, useUnifiedTopology: true})
.then(()=>{
    console.log(`Connected to MongoDB ${moviesDB}`)
}) .catch((err)=>{
    console.log('DB CONNECTION ERROR',err);
});
