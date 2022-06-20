const User = require("../models/user.models");
const bcrypt= require('bcrypt');
const jwt = require ('jsonwebtoken');
const SECRET= process.env.JWT_SECRET;

const register = async (req,res)=>{
    try{
        const user = new User(req.body)
        const newUser = await user.save()
        console.log("NEW USER", newUser);
        const UserToken = jwt.sign(
            {
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
        }, SECRET,
        ); 
        console.log("TOKEN", UserToken);

        res.status(200).cookie('UserToken',UserToken, {
            expires: new Date(Date.now() + 1000000)
        })
        .json({successMessage:"user created",
            user:{
            _id: newUser._id,
            email: newUser.email,
            username: newUser.username,
        },
    });
    } catch(err){
        console.log("ERROR USER CREATION", err)
        res.json(err)
    }
};

const login = async(req,res)=>{
    const userDoc = await User.findOne({email: req.body.email});
    if(!userDoc){
        res.status(400).json({message: 'Invalid Login'})
    } else{
        try{
            const isPasswordValid = await bcrypt.compare(req.body.password,userDoc.password)
            if(!isPasswordValid){
                res.status(400).json({message: "Invalid Login"});
            }else{
                const userToken = jwt.sign(
                    {
                    _id: userDoc._id,
                    email: userDoc.email,
                    username: userDoc.username,
                }, SECRET,
                ); 
                console.log("TOKEN", userToken);
        
                res.cookie('UserToken',userToken, {
                    expires: new Date(Date.now() + 1000000)
                })
                .json({successMessage:"Login successful",
                    user:{
                    _id: userDoc._id,
                    email: userDoc.email,
                    username: userDoc.username,
                },
            });
            }
        } catch(err){
            console.log("login Error",err)
            res.status(400).json({message: "Invalid Login"});
        }
    }
}

const getLoggedInUser= async (req,res)=>{
    try{
        const userPayload =  jwt.verify(req.cookies.UserToken, SECRET)
        const user = User.findOne({_id: user._id})
        res.json(user);
    }catch(err){
        console.log('ERROR IN GETTING USER', err)
        res.status(400).json({err})
    }
}

const logout = (req,res)=>{
    res.clearCookie('userToken')
    res.json({message: 'Your are logged out'})
}

module.exports = {
    register,
    login,
    logout,
    getLoggedInUser,
}