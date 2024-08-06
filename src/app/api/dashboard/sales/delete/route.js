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
            const deleteProduct=await tx.sale_products.deleteMany(
                {
                    where:{
                        UserEmail: UserEmail,
                        SaleID:id,
                    }
                }
            )
            const deleteSales=await tx.sale_summarys.delete(
                {
                    where:{
                        UserEmail: UserEmail,
                        id:id
                    }
                }
            )
            
            return {deleteProduct:deleteProduct,deleteSales:deleteSales}
        })
        return NextResponse.json({status:"success",data:result})
    } catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}