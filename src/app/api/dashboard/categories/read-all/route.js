import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function GET(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        const prisma=new PrismaClient()
        const result = await prisma.categories.findMany({
            where: { UserEmail },
            orderBy: {
                id: 'desc' 

            },
            select: {
                id: true,
                UserEmail: true,
                Name:true,
            }
        })
        return NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}