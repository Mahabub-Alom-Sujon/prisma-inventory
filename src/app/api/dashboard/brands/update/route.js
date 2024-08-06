import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function PUT(req, res) {
    try {
         const headersList = headers()
        const UserEmail = headersList.get('email')
        let { searchParams } = new URL(req.url);
        let id = searchParams.get('id');
         let reqBody=await req.json();
        const prisma = new PrismaClient();
        const result = await prisma.brands.update({ where: { id: id,UserEmail:UserEmail },data:reqBody })
        return NextResponse.json({ status: "success", data: result })
    }
    catch (e) {
        return NextResponse.json({ status: "fail", data: e })
    }
}