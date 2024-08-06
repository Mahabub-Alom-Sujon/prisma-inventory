import ExpenseTypeList from '@/components/expensetype/ExpenseTypeList';
import MasterLayout from '@/components/master/MasterLayout';
import React from 'react';

const page = () => {
    return (
        <MasterLayout>
            <ExpenseTypeList/>
        </MasterLayout>
    );
};

export default page;