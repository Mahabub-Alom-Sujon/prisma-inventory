import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function GET(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        const prisma=new PrismaClient()
        const result = await prisma.expenses.findMany({
            where: { UserEmail },
            orderBy: {
                id: 'desc' 

            },
            select: {
                id: true,
                UserEmail: true,
                Amount: true,
                TypeID: true,
                Note:true,
                createdAt:true,
                expense_types: {
                    select: {
                        Name:true,
                    }
                }
            }
        })
        return NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}