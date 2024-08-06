import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function POST(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        let reqBody = await req.json();
        reqBody.UserEmail=UserEmail
        const prisma = new PrismaClient();
        const result = await prisma.$transaction(async (tx) => {
            //return
            let sales = reqBody['sales']
            sales.UserEmail = UserEmail
            let createSales = await tx.sale_summarys.create({
                data:sales
            })
            let SaleID =createSales.id
            // return Product
            let products = reqBody['products']
            let salesProduct = []
            products.map((item) => {
                let eachProduct = {
                    UserEmail:UserEmail,
                    Qty: item['Qty'],
                    UnitCost: item['UnitCost'],
                    Total: item['Total'],
                    ProductID: item['ProductID'],
                    SaleID:SaleID
                }
                salesProduct.push(eachProduct)
            })
            let createSaleProducts = await tx.sale_products.createMany({
                data:salesProduct
            })
            return { createSales:createSales,createSaleProducts:createSaleProducts} 
        })
        return NextResponse.json({status:"success",data:result})
    } catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }


}