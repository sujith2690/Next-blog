import { connectDB } from "@/dbConfig/dbConfig";
import userModel from '@/models/userModel'
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connectDB()

export async function GET(request: NextRequest) {
    try {

        // get data form token
        const userId = await getDataFromToken(request)
        if (!userId) return NextResponse.json({ error: "Invalid Token" }, { status: 400 })
        const userDetails = await userModel.findOne({ _id: userId }).select("-password")
        if (!userDetails) return NextResponse.json({ error: "User not found" }, { status: 400 })
        return NextResponse.json({ message: "User found", data: userDetails }, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}