import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function GET(req, res) {
    try {
        const prisma = new PrismaClient();
        const headersList = headers()
        const UserEmail = headersList.get('email')
        let { searchParams } = new URL(req.url);
        let pageNo =parseInt(searchParams.get('pageNo'));
        let perPage =parseInt(searchParams.get('perPage'));
        let searchValue =searchParams.get('searchKey');
        const skipRow = (pageNo - 1) * perPage;
        let Rows;
        let Total;
        if (searchValue !== '0') {
            Total = await prisma.categories.count({
                where: {
                    UserEmail,
                    Name: {
                        contains:searchValue
                    }
                }
            })
            Rows = await prisma.categories.findMany({
                where: {
                   UserEmail,
                    Name: {
                        contains: searchValue
                    }
                },
                skip: skipRow,
                take: perPage
            })
        } else {
            Total = await prisma.categories.count({
                where: {
                UserEmail,
            }});
            Rows = await prisma.categories.findMany({
                where: {
                    UserEmail
                },
                skip: skipRow,
                take: perPage,
            });
        }
        return NextResponse.json({status:"success",total: Total,data:Rows})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e})
    }
}