const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { title } = require("process");
const jwtSecret = process.env.JWT_SECRET;

const adminLayout = '../views/layouts/admin'



const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
};







// admin login page
router.get("/admin", async (req, res)=> {
    

    try {
        const locals = {
            title:'Admin',
        }
        res.render("admin/index", {locals,layout:adminLayout});
    } catch (error) {
        console.error(error);
    }
})


//admin log in
router.post("/admin", async (req, res)=> {
    

    try {
        const { username, password } = req.body

        const user = await User.findOne({username});

        if (!user) {
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({message: "Invalid Credentials"});
        }

        const token = jwt.sign({userId: user._id},jwtSecret)
        res.cookie("token", token,{httpOnly:true});

        res.redirect('/dashboard')


    } catch (error) {
        console.error(error);
    }
})


//Dashboard Page
router.get("/dashboard", authMiddleware, async (req,res) => {
    try {
        let locals = {title:"Dashboard"}
        let data = await Post.find();
        res.render("admin/dashboard",{locals,data,layout:adminLayout})
    } catch (error) {
        console.error(error);
    }
});

//Admin Create Post
router.get("/add-post", authMiddleware, async (req,res) => {
    const locals = {title:"Add New Post"}
    res.render("admin/add-post",{locals,layout:adminLayout})
})

router.post('/add-post',authMiddleware, async (req,res) => {
    console.log(req.body);
    let newPost = new Post({
        title:req.body.title,
        body:req.body.body
    })

    Post.create(newPost).then(() => {
        res.redirect("/dashboard")
    }).catch(err => console.error(err))
    
})


router.get("/edit-post/:id", authMiddleware, async (req,res) => {
    const locals = {title:"Edit Post"}
    let data = await Post.findOne({_id:req.params.id})
    res.render('admin/edit-post',{data, layout:adminLayout})
})



router.put("/edit-post/:id", authMiddleware, async (req,res) => {
    await Post.findByIdAndUpdate(req.params.id,{
        title: req.body.title,
        body: req.body.body,
        updatedAt: Date.now()
    })
    res.redirect(`/edit-post/${req.params.id}`)
})


//admin register
router.post("/register", async (req, res)=> {
    

    try {
        const { username, password } = req.body
        const hashedPassword = await bcrypt.hash(password,10);
        try {
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({message:'user created',user});
        } catch (error) {
            if(error.code === 11000){
                res.status(409).json({message:"user already in use"})
            }
            res.status(500).json({message:'internal server error'})
        }
    } catch (error) {
        console.error(error);
    }
})

//delete post
router.delete("/delete-post/:id", authMiddleware, async (req, res)=>{
    await Post.deleteOne({_id: req.params.id})
    res.redirect("/dashboard")
})


//log out
router.get("/logout", async (req, res)=>{
    await res.clearCookie('token');
    res.redirect("/")
})

module.exports = router;