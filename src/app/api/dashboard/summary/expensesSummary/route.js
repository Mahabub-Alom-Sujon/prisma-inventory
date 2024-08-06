import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
import moment  from "moment/moment";
import { data } from "autoprefixer";
export async function GET(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        const prisma = new PrismaClient();
        // Calculate Total Amount
        let totalAmount = await prisma.expenses.aggregate({
            _sum: {
                Amount: true,
            },
            where: {
                UserEmail: UserEmail,
            },
        });
        let last30Days = await prisma.expenses.groupBy({
            by: ['createdAt'],
            _sum: {
                Amount: true,
            },
            where: {
                UserEmail: UserEmail,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 30,
        });
         // Format createdAt date using moment.js
        last30Days = last30Days.map((entry) => ({
            createdAt: moment(entry.createdAt).format("YYYY-MM-DD"),
            TotalAmount: entry._sum.Amount,
        }));
        // Format createdAt dates using moment.js
        // last30Days.forEach(entry => {
        //     entry.createdAt = moment(entry.createdAt).format('YYYY-MM-DD');
        // });
        return NextResponse.json({status:"success",data:{totalAmount,last30Days}})

    } catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}