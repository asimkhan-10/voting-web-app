const express = require('express');
const router = express.Router();
const Candidate = require('../models/candidate');
const {jwtMiddleWare,generateToken} = require('../jwt')
const User = require('../models/user');
const checkAdminRole=async (id)=>{
           try{
        const user = await User.findById(id);
        if(user.role === 'admin'){
            return true;
        }
   }catch(err){
        return false;
   }
}
//adding candidate
router.post('/',jwtMiddleWare,async (req, res) => {
const checkRole=await checkAdminRole(req.user.id)
if(!checkRole)
{
    return res.status(403).json({message:'Access denied. Only admin can create candidates.'});
}
const data = req.body;
try{
    const newCandidate = new Candidate(data);
    const response=await newCandidate.save(); 
res.status(200).json({message:'Candidate created successfully',data:response});
} catch (error) {
    console.log(error);
    res.status(500).json({message:'Error creating candidate',error:error});
}
}
)

//getting list of all candidates
router.get('/',async (req,res)=>{
    try{
        const candidates=await Candidate.find({},'name party age voteCount')
        res.status(200).json({message:'Candidates fetched successfully',data:candidates});
    } catch (error) {
        res.status(500).json({message:'Error fetching candidates',error:error.message});
    }
})

//UPDATE PROFILE
router.put('/:id',jwtMiddleWare,async (req,res)=>{
const checkRole=await checkAdminRole(req.user.id)
if(!checkRole)
{
    return res.status(403).json({message:'Access denied. Only admin can update candidates.'});
}
    try{
        const candidateId=req.params.id
        const updateData=req.body
        const candidate=await Candidate.findByIdAndUpdate(candidateId,updateData,{new:true})
        if(!candidate)
        {
            return res.status(404).json({message:'Candidate not found'});
        }
        const response=await candidate.save()
        res.status(200).json({message:'candidate data updated successfully',data:candidate});
    } catch (error) {
        res.status(500).json({message:'Error updating candidate data',error:error});
    }
})
//delete
router.delete('/:id',jwtMiddleWare,async (req,res)=>{
    const checkRole=await checkAdminRole(req.user.id)
if(!checkRole)
{
    return res.status(403).json({message:'Access denied. Only admin can delete candidates.'});
}
    try{
        const candidateId=req.params.id
        const candidate=await Candidate.findByIdAndDelete(candidateId)
        if(!candidate)
        {
            return res.status(404).json({message:'Candidate not found'});
        }
        res.status(200).json({message:'Candidate deleted successfully'});
    } catch (error) {
        res.status(500).json({message:'Error deleting candidate',error:error});
    }
})

//voting
router.post('/vote/:id',jwtMiddleWare,async (req,res)=>{
    try{
        const candidateId=req.params.id
        const candidate=await Candidate.findById(candidateId)
        if(!candidate)
        {
            return res.status(404).json({message:'Candidate not found'});
        }
        const userId=req.user.id
        const user=await User.findById(userId)
        if(!user)
        {
            return res.status(404).json({message:'User not found'});
        }
        else if(user.role==='admin')
        {
            return res.status(403).json({message:'Admins are not allowed to vote'});
        }
        else if(user.isVoted)
        {
            return res.status(403).json({message:'User has already voted'});
        }
        candidate.votes.push({user:userId})
        candidate.voteCount++
        const response=await candidate.save()
        user.isVoted=true
        await user.save()
        res.status(200).json({message:'Vote recorded successfully',data:response});
    } catch (error) {
        res.status(500).json({message:'Error voting for candidate',error:error});
    }
})
    //showing candidate and how many votes he has
    router.get('/vote/count',async (req,res)=>{
        try{
            //approach 1
            // const voteRecord=await Candidate.find({},'name party voteCount -_id')
            // .sort({voteCount:-1})

            //approach 2
            //we used this approach bcz we can change the name of field according to our need
        const candidate=await Candidate.find().sort({voteCount:-1})
     const voteRecord=candidate.map(candidate=>{
        return{
            name:candidate.name,
            party:candidate.party,
            voteCount:candidate.voteCount
        }
       })
       res.status(200).json({message:'Vote counts fetched successfully',data:voteRecord});
    } catch (error) {
        res.status(500).json({message:'Error fetching vote counts',error:error.message});
    }
})
module.exports=router