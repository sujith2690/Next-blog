import { connectDB } from "@/dbConfig/dbConfig";
import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { userName, email, password } = reqBody
        // validation
        console.log(reqBody, '-----body data')

        const user = await userModel.findOne({ email })
        if (user) {
            return NextResponse.json({ error: "User already exist" }, { status: 400 })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            userName,
            email,
            password: hashedPass
        })
        const savedUser = await newUser.save()
        let userDetails;
        if (savedUser) {
            console.log(savedUser, '---saved User');
            const { password, ...rest } = savedUser._doc;
            userDetails = rest;
        }
        return NextResponse.json({ message: 'User Registered Successfully', success: true, userDetails })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}