const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");

// router.get("/",(req,res)=>{
//     console.log("connect");
// });
//register user 

router.post("/register",async(req,res)=>{
    //console.log(req.body);
    // console.log("hi")
    const{name,email,age,mobile,work,address,desc} = req.body;
    // console.log(name,email,age,mobile,work,add,desc)
    if(!name||!email||!age||!mobile||!work||!address||!desc){
       return  res.status(422).json("please fill the data");
    }
    try{
        
        const preuser = await users.findOne({email:email});
        // console.log(preuser);    

        if(preuser){
            
            res.status(422).json({
                message : "User already exits"
            })
        }else{
            const adduser = new users({
                name,
                email,
                age,
                mobile,
                work,
                address,
                desc
            });
            await adduser.save();
            
            res.status(201).json({
                data : adduser
            });
            console.log(adduser);
        }

    }catch(error){
        console.log(error)
        res.status(422).json({
            message:"Something went wrong",
            errors  : error
        })
    }
})
//get userdata
router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        res.status(201).json(userdata)
        // console.log(userdata);
    } catch (error) {
        res.status(422).json(error);
    }
})
//get individual user
router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)
    } catch (error) {
        res.status(422).json(error)
    }
})
//update user data
router.put("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const data = await req.body
        console.log("hi")
        console.log(req.params)
        console.log(req.body)
        const updateuser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });
        // console.log(updateuser);
        console.log("bye")
        res.status(201).json({
            msg:"updated",
            data : updateuser
        });

    } catch (error) {
        res.status(422).json(error);
    }
})

//delete user
router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteuser = await users.findByIdAndDelete({_id:id})
        console.log(deleteuser);
        res.status(201).json(deleteuser);

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;