import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function GET(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        let {searchParams}=new URL(req.url);
        let id = searchParams.get('id');
        const prisma=new PrismaClient();
        const result = await prisma.products.findUnique({
            where: { id: id, UserEmail: UserEmail },
            select: {
                id: true,
                UserEmail: true,
                Name: true,
                Unit: true,
                Details: true,
                CategoryID: true,
                BrandID: true,
                brands: {
                    select: {
                        Name: true
                    }
                },
                categories: {
                    select: {
                        Name: true
                    }
                }
            }
        })

        return NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}