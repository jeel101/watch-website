require('dotenv').config();
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth");
require("./db/conn");
const Register = require("./models/register");
const Razorpay = require("razorpay");
const cors = require("cors");
const port = process.env.PORT || 3000;
const imageRoutes = require('./routes/imageRoutes'); // Import routes for image upload

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:false}));
app.use('/images', imageRoutes); // Mount image upload routes

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);
app.use(cors());

app.get("/", (req, res) => {
res.render("index")
});

app.get("/wishlist", auth, (req, res) => {
    // console.log(`cookie during login time:${req.cookies.jwt}`);
        const currentUser = req.cookies.user_name; // Retrieve the user's name from the cookie
        res.render('wishlist', {  user: currentUser });
    });

app.get("/login",(req,res) => {
    const currentUser = req.cookies.user_name; // Retrieve the user's name from the cookie
    res.render("login", { user: currentUser })
})

app.get("/payment",(req,res) => {
    const currentUser = req.cookies.user_name; // Retrieve the user's name from the cookie
    res.render("payment", { user: currentUser })
})

// creating a new user in db + login and registration
app.post("/login", async (req,res) => {
    try{
        const action = req.body.action;
        if(action === "login") {
            const email = req.body.mail;
            const password = req.body.pwd;

            const useremail = await Register.findOne({email:email});
            const isMatch = await bcrypt.compare(password, useremail.password);

            const token = await useremail.generateAuthToken();
            console.log(`login token part is ${token}`);

            res.cookie("jwt", token, {
                expires:new Date(Date.now() + 1000000),
                httpOnly:true,
            });

             if(isMatch) {
                const currentUser = useremail.name;
                console.log(currentUser);
                 res.cookie('user_name', currentUser, { maxAge: 900000, httpOnly: true });
                res.status(201).render("index", {user : currentUser});
            }else {
                res.send("invalid Credentials");
            }

        }
        else {
            const registerUser = new Register({
                name: req.body.name,
                phone: req.body.phone,
                email: req.body.email,
                password: req.body.password
            });
    
            // Save the user
            const registered = await registerUser.save();
            res.status(201).render("login");
        }
        
    }catch (error) {
        res.status(400).send(error)
    }
})

app.post("/payment", async (req, res) => {
    let { amount } = req.body;

    var instance = new Razorpay({ key_id: process.env.RAZORPAY_ID_KEY, key_secret: process.env.RAZORPAY_SECRET_KEY})

    let order = await instance.orders.create({
        amount: amount*100,
        currency: "INR",
        receipt: "receipt#1",
    })
    res.status(201).json({
        success: true,
        order,
        amount,
    });
});

app.listen(port, () => {
    console.log(`server is running at port ${port}`);
})



