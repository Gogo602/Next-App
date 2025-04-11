import {connect} from "@/dbConfig/dbconfig"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import  {sendEmail}  from "@/helpers/mailer";



connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password} = reqBody

        //remove for production
        console.log(reqBody)



        //check if user exist
      const user =  await User.findOne({ email: email })

        if (user) {
            return NextResponse.json({
                error: "User already exist"
            }, { status: 400 })
        }


        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
        



        //create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })



        //save
        const savedUser = await newUser.save()
        console.log(savedUser);

        //send verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})


        return NextResponse.json({
            Mesage: "User created succesfully",
            success: true,
            savedUser
        })



        
    } catch (error: unknown) { 
            if (error instanceof Error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            } else {
                console.error("An unexpected error occurred:", error);
                return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
            }
        }
}