import {NextResponse} from "next/server";
import { PrismaClient } from "@prisma/client"
import { headers } from 'next/headers'
export async function POST(req, res) {
    try {
        const headersList = headers()
        const UserEmail = headersList.get('email')
        let reqBody = await req.json();
        reqBody.UserEmail=UserEmail
        const prisma=new PrismaClient();
        const result = await prisma.$transaction(async (tx) => {
            //purchase
            let purchase = reqBody['purchase']
            purchase.UserEmail = UserEmail
            let createPurchase = await tx.purchase_summarys.create({
                data:purchase
            })
            let PurchaseID=createPurchase.id
            // purchase Product
            let products = reqBody['products']
            let purchaseProduct = []
            products.map((item) => {
                let eachProduct = {
                    UserEmail:UserEmail,
                    Qty: item['Qty'],
                    UnitCost: item['UnitCost'],
                    Total: item['Total'],
                    ProductID: item['ProductID'],
                    PurchaseID: PurchaseID
                }
                purchaseProduct.push(eachProduct)
                 
            })
            let createPurchaseProducts = await tx.purchase_products.createMany({
                data:purchaseProduct
            })
            return{createPurchase:createPurchase,createPurchaseProducts:createPurchaseProducts}
        })
        return NextResponse.json({status:"success",data:result})
    }
    catch (e) {
        return  NextResponse.json({status:"fail",data:e.toString()})
    }
}
