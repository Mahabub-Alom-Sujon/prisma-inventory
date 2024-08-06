import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function DELETE(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        const prisma=new PrismaClient();
        let {searchParams}=new URL(req.url);
        let id = searchParams.get('id');
        const result = await prisma.$transaction(async (tx) => {
            const deleteProduct=await tx.return_products.deleteMany(
                {
                    where:{
                        UserEmail: UserEmail,
                        ReturnID:id,
                    }
                }
            )
            const deleteReturns=await tx.return_summarys.delete(
                {
                    where:{
                        UserEmail: UserEmail,
                        id:id
                    }
                }
            )
            
            return {deleteProduct:deleteProduct,deleteReturns:deleteReturns}
        })
        return NextResponse.json({status:"success",data:result})
    } catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}