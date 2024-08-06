import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';
import { cookies } from 'next/headers'
import BrandCreateUpdate from '@/components/brand/BrandCreateUpdate';
async function getData(cookies,id) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Brand = (await (await fetch(`${process.env.HOST}/api/dashboard/brands/read-single?id=${id}`,option)).json())["data"]
    return {Brand}
  }
const page = async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id)
    return (
        <MasterLayout>
            <BrandCreateUpdate id={id} data={data['Brand'] }/>
        </MasterLayout>
    );
};

export default page;