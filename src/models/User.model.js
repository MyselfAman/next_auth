import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"]
    },
    lastname: {
        type: String,
        required: [true, "Lastname is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    isVerified: {
        type: Boolean,
        default:false
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    forgotPasswordToken:{
        type: String,
    },
    forgotPasswordTokenExpiry:{
        type: Date,
    },
    verifyToken:{
        type: String,
    },
    verifyTokenExpiry:{
        type: Date,
    },
},{timeStamps: true});

const User = mongoose.model.users || mongoose.model('User',UserSchema);

export default User;