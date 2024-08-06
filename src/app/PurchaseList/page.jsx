import MasterLayout from '@/components/master/MasterLayout';
import PurchaseList from '@/components/purchase/PurchaseList';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <PurchaseList/>
        </MasterLayout>
    );
};

export default page;