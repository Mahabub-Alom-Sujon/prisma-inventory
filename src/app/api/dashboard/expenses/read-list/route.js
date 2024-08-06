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
            Total = await prisma.expenses.count({
                where: {
                    UserEmail,
                    OR: [
                        {
                            Note: {
                                contains:searchValue
                            }
                        },
                        {
                            expense_types: {
                                Name: {
                                    contains:searchValue
                                }
                                
                            }
                        }
                    ]
                }
            })
            Rows = await prisma.expenses.findMany({
                where: {
                    UserEmail,
                    OR: [
                        {
                            Note: {
                                contains: searchValue
                            }
                        },
                        {
                            expense_types: {
                                Name: {
                                    contains:searchValue
                                }
                                
                            }
                        }
                    ]
                    
                },
                select: {
                    id: true,
                    UserEmail: true,
                    Amount: true,
                    TypeID: true,
                    Note:true,
                    createdAt: true,
                    updatedAt: true,
                    expense_types: {
                        select: {
                            Name:true
                        }
                    }
                },
                skip: skipRow,
                take: perPage
            })
        } else {
            Total = await prisma.expenses.count({
                where: {
                UserEmail,
            }});
            Rows = await prisma.expenses.findMany({
                where: {
                    UserEmail
                },
                select: {
                    id: true,
                    UserEmail: true,
                    Amount: true,
                    TypeID: true,
                    Note:true,
                    createdAt: true,
                    updatedAt: true,
                    expense_types: {
                        select: {
                            Name:true
                        }
                    }
                },
                skip: skipRow,
                take: perPage,
            });
        }
        return NextResponse.json({status:"success",total: Total,data:Rows})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}