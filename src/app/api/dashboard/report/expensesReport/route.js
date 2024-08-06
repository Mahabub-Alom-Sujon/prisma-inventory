import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function GET(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        const prisma = new PrismaClient();
        // let reqBody = await req.json();
        // let FormDate = reqBody['FormDate'];
        // let ToDate = reqBody['ToDate'];
        let { searchParams } = new URL(req.url);
        let FormDate =searchParams.get('FormDate');
        let ToDate =searchParams.get('ToDate');
        let TotalAmount = await prisma.expenses.aggregate({
            _sum: {
                Amount: true,
            },
            where: {
                UserEmail: UserEmail,
                createdAt: {
                    gte: new Date(FormDate),
                    lte: new Date(ToDate),
                },
            },
        })
        let result = await prisma.expenses.findMany({
            where: {
                UserEmail: UserEmail,
                createdAt: {
                    gte:new Date(FormDate),
                    lte:new Date(ToDate),
                },
            },
            include: {
                expense_types:true
            }
        })
        return NextResponse.json({ status: "success", data:{TotalAmount,result} })
    } catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}