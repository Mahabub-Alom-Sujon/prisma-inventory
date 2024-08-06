import React from 'react';
import MasterLayout from '@/components/master/MasterLayout';
import ProfileUpdate from '@/components/users/profile/ProfileUpdate';
import { cookies } from 'next/headers'
async function getData(cookies) {
    let option={method:"GET",headers:{'Cookie':cookies},cache:"no-cache"}
    let Profile= (await (await fetch(`${process.env.HOST}/api/dashboard/profile`,option)).json())['data']

    return{Profile:Profile}
}
const page = async () => {
     const cookieStore = cookies()
    const data=await getData(cookieStore);
    return (
        <MasterLayout>
            <ProfileUpdate  data={data['Profile'] }/>
        </MasterLayout>
    );
};

export default page;