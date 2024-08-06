import MasterLayout from '@/components/master/MasterLayout';
import SaleReport from '@/components/report/SaleReport';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <SaleReport/>
        </MasterLayout>
    );
};

export default page;