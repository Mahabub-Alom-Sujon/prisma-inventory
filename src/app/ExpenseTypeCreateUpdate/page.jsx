import ExpenseTypeCreateUpdate from '@/components/expensetype/ExpenseTypeCreateUpdate';
import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies,id) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let ExpenseType = (await (await fetch(`${process.env.HOST}/api/dashboard/expense_types/read-single?id=${id}`,option)).json())["data"]
    return {ExpenseType}
}
const page = async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id)
    return (
        <MasterLayout>
            <ExpenseTypeCreateUpdate id={id} data={data["ExpenseType"] }/>
        </MasterLayout>
    );
};

export default page;