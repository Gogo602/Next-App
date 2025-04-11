import {connect} from "@/dbConfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = request.json()
        const { email, password } = await reqBody;
        console.log(reqBody)

        //check if user exists
        const user = await User.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "user does not exist"}, 
            {status: 500})
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password, user.password)
        if (!validPassword) {
             return NextResponse.json({ error: "Invalid Password"}, 
            {status: 400})
        }

        //create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login succesafull",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
        
    } catch (error: any) { 
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } else {
            console.error("An unexpected error occurred:", error);
            return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
        }
    }
}