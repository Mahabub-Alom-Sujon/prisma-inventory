import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function GET(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        const prisma = new PrismaClient();
        let { searchParams } = new URL(req.url);
        let FormDate =searchParams.get('FormDate');
        let ToDate =searchParams.get('ToDate');
        let TotalAmount = await prisma.purchase_products.aggregate({
            _sum: {
                Total:true,
            },
            where: {
                UserEmail: UserEmail,
                createdAt: {
                    gte:new Date(FormDate),
                    lte:new Date(ToDate),
                },
            },
        })
        let result = await prisma.purchase_products.findMany({
            where: {
                UserEmail: UserEmail,
                createdAt: {
                    gte:new Date(FormDate),
                    lte:new Date(ToDate),
                },
            },
            include: {
                products: true,
                products: {
                    include: {
                        brands: true,
                        categories:true,
                        
                    }
                }
            
            }
        })
        return NextResponse.json({ status: "success", data:{ TotalAmount,result } })
    } catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}