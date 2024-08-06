import MasterLayout from '@/components/master/MasterLayout';
import PurchaseCrate from '@/components/purchase/PurchaseCrate';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Suppliers = (await (await fetch(`${process.env.HOST}/api/dashboard/suppliers/read-all`, option)).json())["data"]
    let Products = (await (await fetch(`${process.env.HOST}/api/dashboard/product/read-all`, option)).json())["data"]
    return {Suppliers,Products}
}
const page = async () => {
    const cookieStore = cookies()
    //let id=props.searchParams['id']
    const data=await getData(cookieStore)
    return (
        <MasterLayout>
            <PurchaseCrate Suppliers={data['Suppliers']} Products={data['Products']} />
        </MasterLayout>
    );
};

export default page;