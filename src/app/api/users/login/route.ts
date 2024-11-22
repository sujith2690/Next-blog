import { connectDB } from "@/dbConfig/dbConfig";
import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody
        // validation
        console.log(reqBody, '-----body data')

        const user = await userModel.findOne({ email })
        if (!user) {
            return NextResponse.json({ error: "User Not found" }, { status: 400 })
        }
        console.log('user exist', user)
        const validity = await bcrypt.compare(password, user.password);
        if (!validity) {
            return NextResponse.json({ error: "Check your credentials" }, { status: 400 })
        } else {

            const tokenData = {
                userName: user.userName,
                id: user._id,
            }
            const token = jwt.sign(tokenData, process.env.JWT_TOKEN!, {
                expiresIn: '24h'
            })
            const { password, createdAt, ...userDetails } = user._doc;
            const response = NextResponse.json({ message: 'Login Successfully', success: true, userDetails })
            response.cookies.set('token', token, {
                httpOnly: true
            })
            return response
        }

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}