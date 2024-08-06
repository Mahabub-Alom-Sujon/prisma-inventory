import Customer from '@/components/customer/Customer';
import MasterLayout from '@/components/master/MasterLayout';
import { cookies } from 'next/headers'
import React from 'react';
async function getData(cookies,id) {
  let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
  let Customer = (await (await fetch(`${process.env.HOST}/api/dashboard/customers/read-single?id=${id}`,option)).json())["data"]
  return {Customer}
}
const page =async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id)
    return (
        <MasterLayout>
            <Customer id={id} data={data['Customer'] }/>
        </MasterLayout>
    );
};

export default page;