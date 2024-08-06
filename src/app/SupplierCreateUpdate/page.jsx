import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';
import { cookies } from 'next/headers'
import SupplierCreateUpdate from '@/components/supplier/SupplierCreateUpdate';
async function getData(cookies,id) {
    let option = {
        method: "GET",
        headers:{ 'Cookie': cookies },
        cache: "no-cache"
    }
    let Supplier = (await (await fetch(`${process.env.HOST}/api/dashboard/suppliers/read-single?id=${id}`,option)).json())["data"]
    return {Supplier}
}
const page = async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id)
    return (
        <MasterLayout>
            <SupplierCreateUpdate id={id} data={data['Supplier'] }/>
        </MasterLayout>
    );
};

export default page;