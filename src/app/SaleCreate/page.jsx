import MasterLayout from '@/components/master/MasterLayout';
import SaleCreate from '@/components/sale/SaleCreate';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Customer = (await (await fetch(`${process.env.HOST}/api/dashboard/customers/read-all`, option)).json())["data"]
    let Products = (await (await fetch(`${process.env.HOST}/api/dashboard/product/read-all`, option)).json())["data"]
    return {Customer,Products}
}
const page = async () => {
    const cookieStore = cookies()
    //let id=props.searchParams['id']
    const data=await getData(cookieStore)
    return (
        <MasterLayout>
            <SaleCreate Customer={data['Customer']} Products={data['Products']}/>
        </MasterLayout>
    );
};

export default page;