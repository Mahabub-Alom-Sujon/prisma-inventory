import MasterLayout from '@/components/master/MasterLayout';
import Dashboard from '@/components/dashboard/Dashboard';
import { cookies } from 'next/headers'
import React from 'react';
async function getData(cookies) {
  let option = {
    method: "GET",
    headers: { 'Cookie':cookies },
    cache: "no-cache"
  }
  let Expenses = (await (await fetch(`${process.env.HOST}/api/dashboard/summary/expensesSummary`, option)).json())["data"]
  let Sales = (await (await fetch(`${process.env.HOST}/api/dashboard/summary/saleSummary`, option)).json())["data"]
  let Return = (await (await fetch(`${process.env.HOST}/api/dashboard/summary/returnsSummary`, option)).json())["data"]
  let Purchase = (await (await fetch(`${process.env.HOST}/api/dashboard/summary/purchaseSummary`, option)).json())["data"]
  return { Expenses,Sales,Return,Purchase }
  
}
const page = async () => {
  const cookieStore = cookies()
  const data = await getData(cookieStore)
  return (
    <MasterLayout>
      <Dashboard expenses={data['Expenses']} sales={data['Sales']} purchase={data['Purchase']} returns={data["Return"]} />
    </MasterLayout>
  );
};

export default page;