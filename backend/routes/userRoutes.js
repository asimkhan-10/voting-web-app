const express = require('express');
const router = express.Router();
const   User = require('../models/user');
const {jwtMiddleWare,generateToken} = require('../jwt')
router.post('/signup', async (req, res) => {
  const data = req.body;
  try {
    // Enforce single Admin rule: Check if an Admin already exists when attempting to register as Admin
    if (data.role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ message: 'An Admin user already exists. Only one Admin is allowed in the system.' });
      }
    }

    const newUser = new User(data);
    const response = await newUser.save(); 
    const payload = {
      id: response._id
    }
    const token = generateToken(payload)
    res.status(200).json({ message: 'User created successfully', data: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error creating user', error: error.message || error });
  }
})
router.post('/login',async (req,res)=>{
    const {cnic,password}=req.body;
    try{
        const user=await User.findOne({cnic:cnic})
        if(!user)
        {
            return res.status(401).json({message:'Invalid credentials'});
        }
        const isMatch=await user.comparePassword(password);
        if(!isMatch)
        {
            return res.status(401).json({message:'Invalid credentials'});
        }
        const payload={
            id:user._id
        }
        const token=generateToken(payload)
        res.status(200).json({message:'Login successful',token:token});
    }
catch(error)
{
    res.status(500).json({message:'Error logging in',error:error.message});
}
})
//PROFILE
router.get('/profile',jwtMiddleWare,async (req,res)=>{
    try{
        const userId=req.user.id;
        const user=await User.findById(userId)
        if(!user)
        {
            return res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'User profile',data:user});
    } catch (error) {
        res.status(500).json({message:'Error fetching user profile',error:error.message});
    }
})
//UPDATE PROFILE
router.put('/profile/password',jwtMiddleWare,async (req,res)=>{
    try{
        const userId=req.user.id;
        const {currentPassword,newPassword}=req.body
        const user=await User.findById(userId)
        if(!user)
        {
            return res.status(404).json({message:'User not found'});
        }
        const isMatch=await user.comparePassword(currentPassword)
        if(!isMatch)
        {
            return res.status(401).json({message:'Invalid current password'});
        }
        user.password=newPassword
        const response=await user.save()
        res.status(200).json({message:'User password updated'});
    } catch (error) {
        res.status(500).json({message:'Error updating user profile',error:error.message});
    }
})
module.exports=router