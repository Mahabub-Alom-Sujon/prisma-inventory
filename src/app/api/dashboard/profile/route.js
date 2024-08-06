import {NextResponse} from "next/server";
import {PrismaClient} from "@prisma/client"
import { headers } from "next/headers";
export async function GET(req,res){
    try {
        let headerList=headers();
        let id =headerList.get('id');
        const prisma=new PrismaClient();
        const result = await prisma.users.findUnique({
            where: { id: id },
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                mobile: true,
                password: true,
                photo:true,
            }
        })
        return  NextResponse.json({status:"success",data:result})
    }catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}
export async function PUT(req, res) {
    try{
        let headerList=headers();
        let id=headerList.get('id');
        let reqBody=await req.json();
        const prisma=new PrismaClient();
        const result=await prisma.users.update({
            where:{id:id},
            data: reqBody,
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                mobile: true,
                password: true,
            }
        })
        return  NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}