const mongoose = require ('mongoose')
const validator = require ('validator');


const RegiSchema = new mongoose.Schema({
   names :{
        type : String ,
        

        required : true, 
    },
   link :{
        type : String ,
        

        required : true, 
    }
  
    
    
})




   


const Regi = new mongoose.model('Regi', RegiSchema);
 
module.exports= Regi ;