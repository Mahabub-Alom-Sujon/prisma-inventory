import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function DELETE(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        let {searchParams}=new URL(req.url);
        let id = searchParams.get('id');
        const prisma=new PrismaClient();
        const result = await prisma.expense_types.delete({where:{id:id,UserEmail:UserEmail}})

        return NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}