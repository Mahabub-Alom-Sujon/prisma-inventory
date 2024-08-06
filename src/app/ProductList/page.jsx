import MasterLayout from '@/components/master/MasterLayout';
import ProductList from '@/components/product/ProductList';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <ProductList/>
        </MasterLayout>
    );
};

export default page;