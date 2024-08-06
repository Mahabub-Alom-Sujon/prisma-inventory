import MasterLayout from '@/components/master/MasterLayout';
import ProductCreateUpdate from '@/components/product/ProductCreateUpdate';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies,id) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Product = (await (await fetch(`${process.env.HOST}/api/dashboard/product/read-single?id=${id}`, option)).json())["data"]
    let Brand = (await (await fetch(`${process.env.HOST}/api/dashboard/brands/read-all`, option)).json())["data"]
    let Category = (await (await fetch(`${process.env.HOST}/api/dashboard/categories/read-all`, option)).json())["data"]
    return {Product,Brand,Category}
}
const page = async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id)
    return (
        <MasterLayout>
            <ProductCreateUpdate id={id} data={data['Product']} Brand={data['Brand']} Category={data['Category'] } />
        </MasterLayout>
    );
};

export default page;