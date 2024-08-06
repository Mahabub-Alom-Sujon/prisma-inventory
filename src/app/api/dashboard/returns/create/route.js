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
            let Returns = reqBody['Returns']
            Returns.UserEmail = UserEmail
            let createReturn = await tx.return_summarys.create({
                data:Returns
            })
            let ReturnID = createReturn.id
            // return Product
            let products = reqBody['products']
            let returnProduct = []
            products.map((item) => {
                let eachProduct = {
                    UserEmail:UserEmail,
                    Qty: item['Qty'],
                    UnitCost: item['UnitCost'],
                    Total: item['Total'],
                    ProductID: item['ProductID'],
                    ReturnID:ReturnID
                }
                returnProduct.push(eachProduct)
            })
            let createReturnProducts = await tx.return_products.createMany({
                data:returnProduct
            })
            return { createReturn: createReturn, createReturnProducts: createReturnProducts } 
        })
        return NextResponse.json({status:"success",data:result})
    } catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }


}

