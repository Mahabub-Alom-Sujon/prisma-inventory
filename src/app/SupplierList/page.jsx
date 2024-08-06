import MasterLayout from '@/components/master/MasterLayout';
import SupplierList from '@/components/supplier/SupplierList';
import React from 'react';
const page =() => {
    return (
        <MasterLayout>
            <SupplierList/>
        </MasterLayout>
    );
};

export default page;