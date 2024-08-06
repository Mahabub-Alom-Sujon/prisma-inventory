import CategoryList from '@/components/category/CategoryList';
import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <CategoryList/>
        </MasterLayout>
    );
};

export default page;