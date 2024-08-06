import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
export async function POST(req,res){
    try {
        let reqBody = await req.json();
        const prisma=new PrismaClient();
        const otp = await prisma.otps.findFirst({
            where: { email: reqBody['email'], otp: reqBody['otp']}
        });
        if (!otp) {
            return NextResponse.json({
                status: "fail",
                data: "Invalid OTP code"
            });
        }
        await prisma.users.update({
            where: { email: reqBody['email'] },
            data: { password: reqBody['password'] }
        });
        await prisma.otps.deleteMany({
            where: { email: reqBody['email'] }
        });
        return NextResponse.json({status: "success",data: "Password Reset Success"
        });
    }catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}