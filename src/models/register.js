const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
})

// generating tokens
userSchema.methods.generateAuthToken = async function() {
    try {
        console.log(this._id);
        const token = jwt.sign({_id:this._id.toString()}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch (error) {
        res.send("error part" + error);
        console.log("error part" + error);
    }
}

// hashing the password
userSchema.pre("save", async function(next) {
    if(this.isModified("password")){
    console.log(`current pwd is ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    console.log(`current pwd is ${this.password}`);
    }
     next();
});

// creating collection
const Register = new mongoose.model("Register", userSchema);
module.exports = Register;