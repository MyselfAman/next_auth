import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User.model";
import Error from "next/error";
import { connectDB } from "@/dbConfig/dbConnect";
import jwt from "jsonwebtoken"
connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    if (!email)
      return NextResponse.json({ message: "Please provide the email" });
    if (!password)
      return NextResponse.json({ message: "Please provide the password" });

    const user = await User.findOne({email});
    console.log(user);
    
    if (!user) return NextResponse.json({ message: "User doesn't exits" });

     //veryfy password
     const validPassword = await bcrypt.compare(password, user.password)

     if(!validPassword){
        return NextResponse.json({ message: "Password is incorrect, Please check" });
     }
     
     const token = await jwt.sign({
        id: user._id,
        email : user.email,
     }, process.env.SECRET_KEY!, { expiresIn: "1d"});


    user.password = undefined;
    user.token = token

    const response =  NextResponse.json({
      message: "User loggedin successfully",
      statusCode: 200,
      user
    });

    response.cookies.set("authApiKey",token, {httpOnly:true})

    return response

  } catch (error :any) {
    return NextResponse.json({
        message: error.message,
        statusCode: 200,
      });
  }
}
