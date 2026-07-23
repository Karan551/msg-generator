
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/dbConfig/dbConfig";
import UserModel from "@/models/user.models";
import bcrypt from "bcryptjs";
import sendVerificationEmail from "@/helpers/sendVerificationEmail";



export async function POST(request: NextRequest) {
    try {

        // ---------------- To connect DB --------------
        await dbConnect();


        // ---------------- Get Data from Frontend --------------
        const { userName, email, password } = await request.json();

        if (!userName || !email || !password) {
            return NextResponse.json({ success: false, message: "All fields are required." }, { status: 400 });
        }


        const existingVerifiedUser = await UserModel.findOne({
            userName,
            isVerified: true
        });

        if (existingVerifiedUser) {
            return NextResponse.json({
                success: false,
                message: "Username is already taken."
            },
                { status: 400 });
        }
        // ----------------  --------------

        const sixDigitVerifcationCode = String(Math.floor(Math.random() * 900000 + 100000));
        const FIFTEN_MINUTES = 15 * 60 * 1000;

        const existingUserByEmail = await UserModel.findOne({ email });
        if (existingUserByEmail) {

            if (existingUserByEmail.isVerified) {
                return NextResponse.json({
                    success: false,
                    message: "Username already exists with this email."
                }, { status: 400 });
            } else {

                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);

                existingUserByEmail.password = hashedPassword;

                existingUserByEmail.verifyToken = sixDigitVerifcationCode;
                existingUserByEmail.verifyTokenExpiry = new Date(Date.now() + FIFTEN_MINUTES);

                await existingUserByEmail.save();


            }
        } else {

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            await UserModel.create({
                userName,
                email,
                password: hashedPassword,

                verifyToken: sixDigitVerifcationCode,
                verifyTokenExpiry: new Date(Date.now() + FIFTEN_MINUTES),

                messages: []
            });


        }

        // send verifcation email to user
        const emailResponse = await sendVerificationEmail({ userName, otp: sixDigitVerifcationCode, email });

        console.log("this is email response::", emailResponse);

        if (!emailResponse.success) {
            return NextResponse.json({
                success: false,
                message: emailResponse.message
            },
                { status: 500 });
        }

        return NextResponse.json({
            success: true,
            message: "User registered successfully. Please Verify your account."
        }, { status: 200 });


    } catch (error) {
        console.log("Error registering user.");

        return NextResponse.json(
            { success: false, message: "Error Registering User." },
            { status: 500 });
    }
}