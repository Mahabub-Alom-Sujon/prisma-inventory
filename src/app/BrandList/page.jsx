import BrandList from '@/components/brand/BrandList';
import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <BrandList/>
        </MasterLayout>
    );
};

export default page;