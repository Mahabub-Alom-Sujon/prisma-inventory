import CategoryCreateUpdate from '@/components/category/CategoryCreateUpdate';
import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies,id) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Category = (await (await fetch(`${process.env.HOST}/api/dashboard/categories/read-single?id=${id}`,option)).json())["data"]
    return {Category}
}
const page = async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id)
    return (
        <MasterLayout>
            <CategoryCreateUpdate id={id} data={data['Category'] }/>
        </MasterLayout>
    );
};

export default page;