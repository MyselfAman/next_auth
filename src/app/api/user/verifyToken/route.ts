import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import { connectDB } from "@/dbConfig/dbConnect";
connectDB();

export async function GET(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get("token");
    const user = await User.findOne({verifyToken:token , verifyTokenExpiry : { $gt : Date.now()}});

    if(!user) return NextResponse.json({
        message: "User not found lease check token",
        statusCode: 400,
      });
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    user.save();
    return NextResponse.json({
        message: "User verified successfully",
        statusCode: 200,
      });
    
  } catch (error :any) {
    return NextResponse.json({
        message: error.message,
        statusCode: 400,
      });
  }
}
