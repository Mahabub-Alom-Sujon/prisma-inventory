import MasterLayout from '@/components/master/MasterLayout';
import SaleList from '@/components/sale/SaleList';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <SaleList/>
        </MasterLayout>
    );
};

export default page;