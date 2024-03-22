import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User.model";
import { connectDB } from "@/dbConfig/dbConnect";
import { sendEmail } from "@/utils/sendEmail";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { firstname, lastname, email, password } = reqBody;
    console.log(reqBody);

    if (!firstname)
      return NextResponse.json({ message: "Please provide the firstname" });
    if (!lastname)
      return NextResponse.json({ message: "Please provide the lastname" });
    if (!email)
      return NextResponse.json({ message: "Please provide the email" });
    if (!password)
      return NextResponse.json({ message: "Please provide the password" });

    const user = await User.findOne({email});
    console.log(user);
    
    if (user) return NextResponse.json({ message: "User already exits" });

     //hash password
     const salt = await bcrypt.genSalt(10)
     const hashedPassword = await bcrypt.hash(password, salt)

    console.log(hashedPassword);
    
    const createdUser: any = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });
    console.log(createdUser);
    
    if (!createdUser)
      return NextResponse.json({ message: "User is not created, Try gain" });
      createdUser.password = undefined;
      console.log(createdUser._id)
      const hashedToken:string = await bcrypt.hash(createdUser._id.toString(), 8);
      const info  = await sendEmail(hashedToken,createdUser.email);
      console.log(info);

      await User.findByIdAndUpdate(createdUser._id.toString(), {
        verifyToken: hashedToken,
        verifyTokenExpiry : Date.now() + 3600000
      })

      
      return NextResponse.json({
        message: "User created successfully",
        statusCode: 200,
        createdUser,
      });
  } catch (error :any) {
    return NextResponse.json({
        message: error.message,
        statusCode: 200,
      });
  }
}
