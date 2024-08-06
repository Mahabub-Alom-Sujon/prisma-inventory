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
            Total = await prisma.sale_summarys.count({
                where: {
                    UserEmail: UserEmail,
                    OR: [
                            {
                                Note: {
                                    contains: searchValue
                                }
                            },
                            {
                                customers: {
                                    Name: {
                                        contains:searchValue
                                    }
                                }
                            },
                            {
                                customers: {
                                    Address: {
                                        contains:searchValue
                                    }
                                }
                            },
                            {
                                customers: {
                                    Phone: {
                                        contains:searchValue
                                    }
                                }
                            },
                            {
                                customers: {
                                    Email: {
                                        contains:searchValue
                                    }
                                }
                            }
                    ]
                }
            })
            Rows = await prisma.sale_summarys.findMany({
                where: {
                    UserEmail: UserEmail,
                    OR: [
                            {
                                Note: {
                                    contains: searchValue
                                }
                            },
                            {
                                customers: {
                                    Name: {
                                        contains:searchValue
                                    }
                                },
                            },
                            {
                                customers: {
                                    Address: {
                                        contains:searchValue
                                    }
                                }
                            },
                            {
                                customers: {
                                    Phone: {
                                        contains:searchValue
                                    }
                                }
                            },
                            {
                                customers: {
                                    Email: {
                                        contains:searchValue
                                    }
                                }
                            }
                    ]
                },
                select:{
                    id: true,
                    UserEmail: true,
                    VatTax:true,
                    Discount:true,
                    OtherCost:true,
                    ShippingCost:true,
                    GrandTotal:true,
                    Note:true,
                    CustomerID:true,
                    createdAt: true,
                    customers: {
                        select: {
                            id:true,
                            Name:true,
                            Address:true,
                            Phone:true,
                            Email:true,
                        }
                    }
                },
                skip: skipRow,
                take: perPage
            })
        } else {
            Total = await prisma.sale_summarys.count({
                where: {
                    UserEmail,
                }
            });
            Rows = await prisma.sale_summarys.findMany({
                where: {
                    UserEmail
                },
                select:{
                    id: true,
                    UserEmail: true,
                    VatTax:true,
                    Discount:true,
                    OtherCost:true,
                    ShippingCost:true,
                    GrandTotal:true,
                    Note:true,
                    CustomerID:true,
                    createdAt: true,
                    customers: {
                        select: {
                            id:true,
                            Name:true,
                            Address:true,
                            Phone:true,
                            Email:true,
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