import ExpenseCreateUpdate from '@/components/expense/ExpenseCreateUpdate';
import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';
import { cookies } from 'next/headers'
async function getData(cookies,id) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Expense = (await (await fetch(`${process.env.HOST}/api/dashboard/expenses/read-single?id=${id}`, option)).json())["data"]
    let ExpenseType = (await (await fetch(`${process.env.HOST}/api/dashboard/expense_types/read-all`, option)).json())["data"]
    return {Expense,ExpenseType}
}
const page = async (props) => {
    const cookieStore = cookies()
    let id=props.searchParams['id']
    const data=await getData(cookieStore,id)
    return (
        <MasterLayout>
            <ExpenseCreateUpdate id={id} data={data["Expense"]} ExpenseType={data['ExpenseType'] }/>
        </MasterLayout>
    );
};

export default page;