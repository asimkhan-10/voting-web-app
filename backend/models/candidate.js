const mongoose = require('mongoose');
const candidateScheme=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    party:
    {
        type:String,
        required:true,
        unique:true
    },
    age:
    {
        type:Number,
        required:true
    },
    voteCount:{
        type:Number,
        default:0
    },
    votes:[
        {
            user:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
          votedAt:{
                type:Date,
                default:Date.now
          }  
        }
    ]
})
const Candidate=mongoose.model('Candidate',candidateScheme);
module.exports=Candidate;