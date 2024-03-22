import { NextRequest, NextResponse } from "next/server";
import User from "@/models/User.model";
import jwt from "jsonwebtoken"
import { connectDB } from "@/dbConfig/dbConnect";
connectDB();

export async function GET(request: NextRequest) {
  try {
    
    let token = request.cookies.get('authApiKey')?.value || '';
    let decoded:any = jwt.verify(token, process.env.SECRET_KEY!);
    const currentUser = await User.findById(decoded.id);
    currentUser.password = undefined
    return NextResponse.json({
        statusCode: 200,
        message : "Current user fetched successfully",
        currentUser

    })
  } catch (error :any) {
    return NextResponse.json({
        message: error.message,
        statusCode: 200,
      });
  }
}
