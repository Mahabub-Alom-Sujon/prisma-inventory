export const revalidate = 0; 
import CustomerList from '@/components/customer/CustomerList';
import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <CustomerList/>
        </MasterLayout>
    );
};

export default page;